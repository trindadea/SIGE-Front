const openMap = (state) => {
  return state.openMap
}
const filterOptions = (state) => {
  return state.filterOptions
}
const chartOptions = (state) => {
  return state.chartOptions
}

const getPhaseChartLoadingStatus = (state) => {
  return state.isLoadingPhaseChart
}

export {
  openMap,
  filterOptions,
  chartOptions,
  getPhaseChartLoadingStatus
}
