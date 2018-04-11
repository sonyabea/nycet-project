import { createSelector } from 'reselect'
import _ from 'lodash'

const getAllSelected = type => state => state[type].selectors
const getData = state => state.data.all

const getSelected = (type, column) => createSelector(
	[getAllSelected(type)],
	allSelected => _.pick(allSelected, column)
)

const getUnique = column => state => createSelector(
	[getData],
	data => _.chain(data).map(column).uniq().value()
)

const getFilteredUnique = (type, filterColumn, uniqueColumn) => state => createSelector(
	[getData, getSelected(filterColumn)],
	(data, filterClause) => _.chain(data).filter(filterClause).map(uniqueColumn).uniq().value()
)

export const getPlotData = type => state => createSelector(
	[getData, getAllSelected(type)],
	(data, allSelected) => _.filter(data, allSelected)
)

export const getExperimentsSelectionOptions = state => createSelector(
	[getUnique('election'), getFilteredUnique('experiments', 'election', 'org')],
	(election, org) => { election, org }
)

export const getDemographicsSelectionOptions = state => createSelector(
	[getUnique('election'), getFilteredUnique('demographics', 'election', 'demo_1_type')],
	(election, demo_1_type) => { election, demo_1_type }
)