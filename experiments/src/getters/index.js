import { createSelector } from 'reselect'
import _ from 'lodash'

const getAllSelected = type => state => state[type].selectors
const getData = state => state.data.all

const getPlotData = type => state => createSelector(
	[getData, getAllSelected(type)],
	(data, allSelected) => _.filter(data, allSelected)
)

const getSelected = (type, column) => state => createSelector(
	[getAllSelected(type)],
	allSelected => _.pick(allSelected, column)
)

// take data, map over first column, get uniq, store
// filter data over first column, map over second column, get uniq, store
// filter data over second column, map over first column, get uniq, store

const getSelectionOptions = (argsList) => {
	let selectionOptions = {}
	argsList.slice(1).reduce((a, b) => {
		let key = _.keys(b)[0]
		selectionOptions[key] = _.chain(a).map(b).uniq().value()
		return _.filter(a, b)
	}, argsList[0])
	// do a null check for selectionOptions
	return selectionOptions
}

export const getExperimentsPlotData = getPlotData('experiments')
export const getDemographicsPlotData = getPlotData('demographics')


export const getExperimentsSelectionOptions = state => createSelector(
	[ getData, ...['election', 'org'].map(c => getSelected('experiments', c)) ],
	(data, selectedElection, selectedOrg) => getSelectionOptions(arguments)
)

export const getDemographicsSelectionOptions = state => createSelector(
	[ getData, ...['election', 'demo_type_1', 'demo_type_2'].map(c => getSelected('demographics', c)) ],
	(data, selectedElection, selectedDemo1, selectedDemo2) => getSelectionOptions(arguments)
)
