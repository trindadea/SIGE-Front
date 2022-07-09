const changeMapStatus = ({ commit }) => {
  commit('changeMapStatus')
}

const updateFilter = ({ commit }, options) => {
  commit('updateFilter', options)
}

const updateChartPhase = async ({ commit }, filterCallback) => {
  try {
    commit('isLoadingPhaseChart', true)
    const filter = await filterCallback()
    commit('updateChartPhase', filter)
  } catch (err) {
    console.log(err)
  } finally {
    commit('isLoadingPhaseChart', false)
  }
}

export {
  changeMapStatus,
  updateFilter,
  updateChartPhase
}
