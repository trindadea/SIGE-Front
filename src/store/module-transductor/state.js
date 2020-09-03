import { getDateNowSelectFormat } from '../../utils/transductorStatus'

export default {
  openMap: false,
  chartOptions: {
    phase_a: [],
    phase_b: [],
    phase_c: [],
    unit: '',
    dimension: '',
    status: false,
    graphType: ''
  },
  filterOptions: {
    dimension: 'Tensão',
    vision: '',
    startDate: getDateNowSelectFormat(1),
    endDate: getDateNowSelectFormat()
  }
}
