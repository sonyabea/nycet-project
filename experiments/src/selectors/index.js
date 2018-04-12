import { createSelector } from 'reselect'
import _ from 'lodash'

const getAllSelected = type => state => state[type].selected

const getAllData = state => state.data

const getData = type => type === 'demographics' ? getAllData : createSelector(
	[ getAllData ],
	data => _.filter(data, {'demo_1_type': 'org', 'demo_2_type': 'all'})
)

const getPlotData = type => createSelector(
	[ getData(type), getAllSelected(type) ],
	(data, allSelected) => _.filter(data, allSelected)
)

const getSelected = (type, column) => createSelector(
	[ getAllSelected(type) ],
	allSelected => _.pick(allSelected, column)
)

const getAllOrgs = createSelector(
	[ getData('experiments'), getSelected('experiments', 'election') ],
	(data, selectedElection) => _.filter(data, { ...selectedElection, demo_1_value: 'all'}) 
)

export const getExperimentsPlotData = createSelector(
	[ getPlotData('experiments'), getAllOrgs ],
	(filteredData, allOrgs) => [ ...filteredData, ...allOrgs ]
		.map(d => {
			return { ...d, x: d.demo_1_value }
		})
)

export const getDemographicsPlotData = createSelector(
	[ getPlotData('demographics'), getAllSelected('demographics') ],
	(data, allSelected) => {
		let xAxis = allSelected.demo_2_value === 'all' ? 'demo_2_value' : 'demo_1_value'
		return data.map(d => { 
			return {...d, x: d[xAxis] }
		})
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

const getDropdownOptions = (data, selected) => selected.reduce(
	(a, b) => {
		let { currentData, dropdownOptions } = a
		let key = _.keys(b)[0]
		dropdownOptions[key] = _.chain(currentData)
			.groupBy(key)
			.mapValues(v => _.sumBy(v, 'control'))
			.toPairs()
			.sortBy(x => 1 / x[1]) // hopefully there aren't any zeros
			.flatMap(x => x[0])
			.value()
		return { data: _.filter(currentData, b), dropdownOptions }
	},
	{ data, 'dropdownOptions': {} }
	).dropdownOptions

export const getExperimentsDropdownOptions = createSelector(
	[ getData('experiments'), ...['election', 'demo_1_value'].map(c => getSelected('experiments', c)) ],
	(data, selectedElection, selectedOrg) => getDropdownOptions(data, [selectedElection, selectedOrg]) 
)

export const getDemographicsDropdownOptions = createSelector(
	[ getData('demographics'), ...['election', 'demo_type_1', 'demo_type_2'].map(c => getSelected('demographics', c)) ],
	(data, selectedElection, selectedDemo1, selectedDemo2) => getDropdownOptions(data, [selectedElection, selectedDemo1, selectedDemo2])
)
