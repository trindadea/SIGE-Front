const changePeriodicity = ({ commit }, periodicity) => {
  commit('changePeriodicity', periodicity)
}

const changeStartDate = ({ commit }, startDate) => {
  commit('changeStartDate', startDate)
}

const changeEndDate = ({ commit }, endDate) => {
  commit('changeEndDate', endDate)
}

export {
  changePeriodicity,
  changeStartDate,
  changeEndDate
}
