const getUrl = (state) => {
  return state.url
}

const errorStartDate = (state) => {
  return state.errorStartDate
}

const errorEndDate = (state) => {
  return state.errorEndDate
}

export {
  getUrl,
  errorStartDate,
  errorEndDate
}
