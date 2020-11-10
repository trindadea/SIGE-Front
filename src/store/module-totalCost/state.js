import moment from 'moment'

export default {
  periodicity: 'daily',
  url: '/graph/cost-consumption/?type=daily',
  startDate: moment('1970-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss'),
  endDate: moment(),
  idCampus: '',
  idGroup: '',
  errorStartDate: false,
  errorEndDate: false,
  serieChart: []
}
