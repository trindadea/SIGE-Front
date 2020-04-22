export function setDashboardEvents(state, events) {
  state.dashboard.events = events
}

export function setDashboardCampi(state, campiList) {
  state.dashboard.campi = campiList
}

export function setDashboardActiveCampus(state, activeCampus) {
  state.dashboard.active.campus = activeCampus
}

export function setDashboardActiveTransductor(state, activeTransductor) {
  state.dashboard.active.transductor = activeTransductor
}
