const changeMapStatus = ({ commit }) => {
  commit('changeMapStatus')
}

const updateFilter = ({ commit }, options) => {
  commit('updateFilter', options)
}

const updateChartPhase = ({ commit }, filter) => {
  commit('updateChartPhase', filter)
}

export {
  changeMapStatus,
  updateFilter,
  updateChartPhase
}
