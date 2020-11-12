import moment from 'moment'

export default {
  periodicity: 'hourly',
  url: '/graph/cost-consumption/?type=hourly',
  startDate: moment(),
  endDate: moment(),
  idCampus: '',
  idGroup: '',
  errorStartDate: false,
  errorEndDate: false,
  serieChart: [],
  typeXAxisGraph: 'Hora',
  thereIsConsumption: false
}
