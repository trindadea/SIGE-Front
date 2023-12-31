import moment from 'moment'

const changePeriodicity = (state, periodicity) => {
  const position = state.url.indexOf('/?type=')

  if (position > 0) {
    state.url = state.url.replace(state.periodicity, periodicity)
  } else {
    state.url = state.url + '/?type=' + periodicity
  }

  state.periodicity = periodicity
}

const changeStartDate = (state, startDate) => {
  startDate = moment(startDate, 'DD-MM-YYYY')
  if (startDate.isAfter(moment()) || startDate.isSameOrAfter(state.endDate)) {
    clearStartDate(state)
    state.errorStartDate = true
  } else {
    state.errorStartDate = false

    startDate = `${startDate.format('YYYY-MM-DD HH:mm')}`

    const position = state.url.indexOf('&start_date=')

    if (position > 0) {
      state.url = state.url.replace(state.startDate, startDate)
    } else {
      state.url = state.url + '&start_date=' + startDate
    }

    state.startDate = startDate
  }
}

const changeEndDate = (state, endDate) => {
  endDate = moment(endDate, 'DD-MM-YYYY')
  if (endDate.isAfter(moment()) || endDate.isSameOrBefore(state.startDate)) {
    clearEndDate(state)
    state.errorEndDate = true
  } else {
    state.errorEndDate = false

    endDate = `${endDate.format('YYYY-MM-DD HH:mm')}`

    const position = state.url.indexOf('&end_date=')

    if (position > 0) {
      state.url = state.url.replace(state.endDate, endDate)
    } else {
      state.url = state.url + '&end_date=' + endDate
    }

    state.endDate = endDate
  }
}

const filterByCampus = (state, idCampus) => {
  const position = state.url.indexOf('&campus=')

  state.url = state.url.replace(`&group=${state.idGroup}`, '')

  if (position > 0) {
    state.url = state.url.replace(state.idCampus, idCampus)
  } else {
    state.url = state.url + '&campus=' + idCampus
  }

  state.idCampus = idCampus
}

const filterByGroup = (state, idGroup) => {
  const position = state.url.indexOf('&group=')

  if (position > 0) {
    state.url = state.url.replace(state.idGroup, idGroup)
  } else {
    state.url = state.url + '&group=' + idGroup
  }

  state.idGroup = idGroup
}

const clearStartDate = (state) => {
  state.url = state.url.replace('&start_date=' + state.startDate, '')
  state.startDate = ''
}

const clearEndDate = (state) => {
  state.url = state.url.replace('&end_date=' + state.endDate, '')
  state.endDate = ''
}

const updateChartSerie = (state, serieChart) => {
  state.thereIsConsumption = false
  if (state.serieChart) {
    const seriePlot = Object.values(serieChart)
    const dataSerie = []

    seriePlot.forEach(item => {
      if (item !== 0) {
        state.thereIsConsumption = true
      }
    })

    Object.keys(serieChart).forEach(function (key) {
      dataSerie.push({ x: key, y: serieChart[key] })
    })

    if (state.periodicity === 'hourly') {
      state.typeXAxisGraph = 'HORA'
    } else if (state.periodicity === 'daily') {
      state.typeXAxisGraph = 'DIA'
    } else {
      state.typeXAxisGraph = 'MÊS'
    }

    state.serieChart = [{
      name: 'Consumo (Wh)',
      data: dataSerie
    }]
  } else {
    state.serieChart = []
  }
}
const isLoadingChart = (state, loadingChartStatus) => {
  state.isLoadingChart = loadingChartStatus
}

export {
  changePeriodicity,
  changeStartDate,
  changeEndDate,
  filterByCampus,
  filterByGroup,
  clearStartDate,
  clearEndDate,
  updateChartSerie,
  isLoadingChart
}
