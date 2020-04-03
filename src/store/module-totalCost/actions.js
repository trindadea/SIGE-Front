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

export {
  changePeriodicity,
  changeStartDate,
  changeEndDate,
  updateBarChart
}
