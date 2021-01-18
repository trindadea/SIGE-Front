const changePeriodicity = ({ commit }, periodicity) => {
  commit('changePeriodicity', periodicity)
}

const changeStartDate = ({ commit }, startDate) => {
  commit('changeStartDate', startDate)
}

const changeEndDate = ({ commit }, endDate) => {
  commit('changeEndDate', endDate)
}

const updateBarChart = ({ commit }) => {
  commit('updateBarChart')
}

const filterByCampus = ({ commit }, idCampus) => {
  commit('filterByCampus', idCampus)
}

const filterByGroup = ({ commit }, idGroup) => {
  commit('filterByGroup', idGroup)
}

const clearStartDate = ({ commit }) => {
  commit('clearStartDate')
}

const clearEndDate = ({ commit }) => {
  commit('clearEndDate')
}

const updateChartSerie = ({ commit }, serie) => {
  commit('updateChartSerie', serie)
}

export {
  changePeriodicity,
  changeStartDate,
  changeEndDate,
  updateBarChart,
  filterByCampus,
  filterByGroup,
  clearStartDate,
  clearEndDate,
  updateChartSerie
}
