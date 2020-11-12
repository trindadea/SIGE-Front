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
  categoriesXAxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  typeXAxisGraph: 'Hora'
}
