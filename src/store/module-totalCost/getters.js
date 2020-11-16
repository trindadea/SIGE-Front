const getUrl = (state) => {
  return state.url
}

const errorStartDate = (state) => {
  return state.errorStartDate
}

const errorEndDate = (state) => {
  return state.errorEndDate
}

const totalCostChart = (state) => {
  return state.totalCostChart
}

export {
  getUrl,
  errorStartDate,
  errorEndDate,
  totalCostChart
}
