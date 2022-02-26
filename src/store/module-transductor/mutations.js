const changeMapStatus = (state) => {
  state.openMap = !state.openMap
}
const updateChartPhase = (state, options) => {
  state.chartOptions.phase_a = options.phase_a
  state.chartOptions.phase_b = options.phase_b
  state.chartOptions.phase_c = options.phase_c
  state.chartOptions.values = options.values
  state.chartOptions.min = options.min
  state.chartOptions.max = options.max
  state.chartOptions.unit = options.unit
  state.chartOptions.dimension = options.dimension
  state.chartOptions.status = options.status
  state.chartOptions.graphType = options.graphType
  state.chartOptions.decimals = options.decimals
}
const updateFilter = (state, filter) => {
  state.filterOptions.dimension = filter.dimension
  state.filterOptions.vision = filter.vision
  state.filterOptions.startDate = filter.startDate
  state.filterOptions.endDate = filter.endDate
}

const isLoadingPhaseChart = (state, loadingChartStatus) => {
  state.isLoadingPhaseChart = loadingChartStatus
}

export {
  changeMapStatus,
  updateChartPhase,
  updateFilter,
  isLoadingPhaseChart
}
