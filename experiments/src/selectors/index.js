import { createSelector } from 'reselect'
import _ from 'lodash'


export const getLoading = state => state.data.loading

const getAllData = state => state.data.all
export const getAllSelected = type => state => state[type].selected
export const getOrder = type => state => state[type].order

export const getData = type => type === 'demographics' ? getAllData : createSelector(
	[ getAllData ],
	data =>	_.filter(data, {'dem1': 'org', 'dem2': null})
)

const getPlotData = type => createSelector(
	[ getData(type), getAllSelected(type) ],
	(data, allSelected) => {
		debugger
		return _.filter(data, allSelected)
	}
)

const getSelected = (type, column) => createSelector(
	[ getAllSelected(type) ],
	allSelected => _.pick(allSelected, column)
)

const getAllOrgs = createSelector(
	[ getData('experiments'), getSelected('experiments', 'election') ],
	(data, selectedElection) => _.filter(data, { ...selectedElection, dem1_value: 'all'}) 
)

export const getExperimentsPlotData = createSelector(
	[ getPlotData('experiments'), getAllOrgs ],
	(filteredData, allOrgs) => [ ...filteredData, ...allOrgs ]
		.map(d => {
			return { ...d, x: d.dem1_value }
		})
)

export const getDemographicsPlotData = createSelector(
	[ getPlotData('demographics'), getAllSelected('demographics') ],
	(data, allSelected) => {
		return !allSelected.dem2 ?
			data.map(d => ({ ...d, x: d.dem1_value })) :
			data.map(d => ({ ...d, x: (d.dem1_value + ' / ' + d.dem2_value) }))
	}
)

export const getSizeOfGroups = createSelector(
	[ getPlotData('demographics') ],
	data => _.chain(data)
		.map(_.pick(['control', 'treatment']))
		.reduce((a, b) => {
			return {
				control: a.control + b.control,
				treatment: a.treatment + b.treatment
			}
		})
		.value()
)

// take data, get first column (sorted by sum of control), store
// filter data over first column, get second column (sorted by sum of control), store
// keep going (okay there's no way anyone's gonna be able to this)

const deriveDropdownOptions = (data, selected) => selected.reduce(
	(a, b) => {
		let { data: currentData, dropdownOptions } = a
		let key = _.keys(b)[0]
		let dropdownTexts = _.chain(currentData)
			.groupBy(key)
			.mapValues(v => _.sumBy(v, 'control'))
			.toPairs()
			.sortBy(x => 1 / x[1]) // hopefully there aren't any zeros
			.flatMap(x => x[0])
			.value()
		dropdownOptions[key] = dropdownTexts.map((d, i) => ({key: i, text: d}))
		return { data: _.filter(currentData, b), dropdownOptions }
	},
	{ data, 'dropdownOptions': {} }
	).dropdownOptions


// refactor this to just be able to enter type
const getExperimentsDropdownOptions = createSelector(
	[ getData('experiments'), ...['election', 'dem1_value'].map(c => getSelected('experiments', c)) ],
	(data, selectedElection, selectedOrg) => deriveDropdownOptions(data, [selectedElection, selectedOrg]) 
)

const getDemographicsDropdownOptions = createSelector(
	[ getData('demographics'), ...['election', 'dem1', 'dem2'].map(c => getSelected('demographics', c)) ],
	(data, selectedElection, selectedDemo1, selectedDemo2) => deriveDropdownOptions(data, [selectedElection, selectedDemo1, selectedDemo2])
)

export const getDropdownOptions = type => 
	type === 'experiments' ? getExperimentsDropdownOptions : getDemographicsDropdownOptions
