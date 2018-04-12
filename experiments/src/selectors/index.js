import { createSelector } from 'reselect'
import _ from 'lodash'

const getAllSelected = type => state => state[type].selectors
const getData = type => state => state[type].data

const getPlotData = type => state => createSelector(
	[getData(type), getAllSelected(type)],
	(data, allSelected) => _.filter(data, allSelected)
)

const getSelected = (type, column) => state => createSelector(
	[getAllSelected(type)],
	allSelected => _.pick(allSelected, column)
)

const getAllOrgs = state => createSelector(
	[getData('experiments'), getSelected('experiments', 'election')],
	(data, selectedElection) => _.filter(data, { ...selectedElection, org: 'all'}) 
)

export const getExperimentsPlotData = state => createSelector(
	[getPlotData('experiments'), getAllOrgs('experiments')],
	(filteredData, allOrgs) => [ ...filteredData, ...allOrgs ]
)

export const getDemographicsPlotData = getPlotData('demographics')

export const getSizeOfGroups = state => createSelector(
	[getData('demographics'), getSelected('demographics', 'election')],
	(data, selectedElection) => _.chain(data).filter(selectedElection).pick(['control', 'treatment']).value()
)

// take data, get first column (sorted by sum of control), store
// filter data over first column, get second column (sorted by sum of control), store
// keep going (okay there's no way anyone's reading this)

const getSelectionOptions = (argsList) => argsList.slice(1).reduce(
	(a, b) => {
		let { data, selectionOptions } = a
		let key = _.keys(b)[0]
		selectionOptions[key] = _.chain(data)
			.groupBy(key)
			.mapValues(v => _.sumBy(v, 'control'))
			.toPairs()
			.sortBy(x => 1 / x[1]) // hopefully there aren't any zeros
			.flatMap(x => x[0])
			.value()
		return { data: _.filter(data, b), selectionOptions }
	},
	{'data': argsList[0], 'selectionOptions': {}
	}).selectionOptions

export const getExperimentsSelectionOptions = state => createSelector(
	[ getData('experiments'), ...['election', 'org'].map(c => getSelected('experiments', c)) ],
	(data, selectedElection, selectedOrg) => getSelectionOptions(arguments)
)

export const getDemographicsSelectionOptions = state => createSelector(
	[ getData('demographics'), ...['election', 'demo_type_1', 'demo_type_2'].map(c => getSelected('demographics', c)) ],
	(data, selectedElection, selectedDemo1, selectedDemo2) => getSelectionOptions(arguments)
)
