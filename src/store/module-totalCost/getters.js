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

const getStartDate = (state) => {
  if (state.startDate.constructor.name === 'Moment') {
    return state.startDate.format('YYYY-MM-DD HH:mm:ss')
  }
  return state.startDate
}

const getEndDate = (state) => {
  if (state.endDate.constructor.name === 'Moment') {
    return state.endDate.format('YYYY-MM-DD HH:mm:ss')
  }
  return state.endDate
}

export {
  getUrl,
  errorStartDate,
  errorEndDate,
  totalCostChart,
  getStartDate,
  getEndDate
}
