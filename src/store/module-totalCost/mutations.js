const changePeriodicity = async (state, periodicity) => {
  let position = state.url.indexOf('/?type=')

  if (position > 0) {
    state.url = state.url.replace(state.periodicity, periodicity)
  } else {
    state.url = state.url + '/?type=' + periodicity
  }

  state.periodicity = periodicity
}

const changeStartDate = async (state, startDate) => {
  let date = startDate.split('/')
  startDate = `${date[1]}-${date[0]}-${date[2]}  00:00`

  let position = state.url.indexOf('&start_date=')

  if (position > 0) {
    state.url = state.url.replace(state.startDate, startDate)
  } else {
    state.url = state.url + '&start_date=' + startDate
  }

  state.startDate = startDate
}

const changeEndDate = async (state, endDate) => {
  let date = endDate.split('/')
  endDate = `${date[1]}-${date[0]}-${date[2]}  00:00`

  let position = state.url.indexOf('&end_date=')

  if (position > 0) {
    state.url = state.url.replace(state.endDate, endDate)
  } else {
    state.url = state.url + '&end_date=' + endDate
  }

  state.endDate = endDate
}

export {
  changePeriodicity,
  changeStartDate,
  changeEndDate
}
