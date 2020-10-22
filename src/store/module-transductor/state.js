import { getDateNowSelectFormat } from '../../utils/transductorStatus'

export default {
  openMap: false,
  chartOptions: {
    phase_a: [],
    phase_b: [],
    phase_c: [],
    values: [],
    min: 0,
    max: 0,
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
