import { createSelector } from 'reselect'
import _ from 'lodash'

const getAllData = state => state.data.all
export const getAllSelected = type => state => state[type].selected

const getColumns = type => state => state[type].columns
export const getColumnNames = type => state => getColumns(type)(state).map(c => c.name)

export const getData = type =>
	type === 'demographics' ? getAllData : createSelector(
		[ getAllData ],
		data =>	data.filter(d => d.dem1 === 'org' && d.dem2 === 'all' && d.dem1_value !== 'All Orgs')
)

const getInitialPlotData = type => createSelector(
	[ getData(type), getAllSelected(type) ],
	(data, allSelected) =>  _.filter(data, allSelected)
		.map(d => d.dem1_value && d.dem2_value ?
			{ ...d, x: (d.dem1_value + ' / ' + d.dem2_value) } :
			{ ...d, x: d.dem1_value || d.dem2_value }
		)
)

const getAllOrgs = createSelector(
	[ getAllData, getAllSelected('experiments') ],
	(data, selected) => _.filter(data, { ...selected, dem1_value: 'All Orgs'})
		.map( d => ({ ...d, x: d.dem1_value }) )
)

export const getPlotData = type =>
	type === 'demographics' ? getInitialPlotData('demographics') : createSelector(
		[ getInitialPlotData('experiments'), getAllOrgs ],
		(data, allOrgs) => [ ...data, ...allOrgs ]
)

const getSelected = (type, column) => createSelector(
	[ getAllSelected(type) ],
	allSelected => _.pick(allSelected, column)
)

export const getElectionGroupSizes = type => createSelector(
	[ getAllData, getSelected(type, 'election') ],
	(data, election) => _.chain(data)
		.find({ ...election, dem1_value: 'All Orgs' })
		.pick(['control_pop', 'treatment_pop'])
		.value()
)

const capitalize = string => string.charAt(0).toUpperCase() + string.substr(1)
const format = string => string.split('_').map(capitalize).join(' ')

const getOrderedSelected = type => createSelector(
	[ getColumns(type), getAllSelected(type) ],
	(columns, allSelected) => columns.map(c => ({ ...c, selected: allSelected[c.name]}))
)

// take data, get first column (sorted by sum of control_pop), store
// filter data over first column, get second column (sorted by sum of control_pop), store
// repeat
const deriveDropdownOptions = (data, selected) => selected.reduce(
	({ data: currentData, dropdownOptions }, b) => {
		let newDropdownOptions = _.chain(currentData)
			.groupBy(b.name)
			.mapValues(v => _.sumBy(v, 'total_pop')) // find total population of each option
			.toPairs()
			.sortBy(x => 1 / (x[1] + 1)) // sort by descending, account for any possible zeros in denominator
			.flatMap(x => x[0])
			.map(d => ({key: d, text: format(d), value: d})) // format for semanticUI
			.value()
		let largestOptionLength = _.maxBy(newDropdownOptions, o => o.text.length).text.length
		let width = (7*largestOptionLength + 45) + 'px'
		return {
			data: _.filter(currentData, {[b.name]: b.selected}),
			dropdownOptions: [
				...dropdownOptions,
				{ ...b, selected: b.selected && format(b.selected), options: newDropdownOptions, width }
			]
		}
	},
	{ data, 'dropdownOptions': [] }
	).dropdownOptions

export const getDropdownOptions = type => createSelector(
	[ getData(type), getOrderedSelected(type) ],
	deriveDropdownOptions
)
