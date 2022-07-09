import BarChart from './BarChart.vue'

export default {
  title:'BarChart',
  component: BarChart,
  argTypes: {
    isCostPage: { type: 'boolean' },
    chartTitle: { type: 'string'},
    exportOptions: {type: 'object'}
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BarChart },
  template: '<bar-chart v-bind="$props"/>'
})


export const Default = Template.bind({})
Default.args = {
  chartTitle: "Bar Chart",
  isCostPage: true,
  totalCostChart: { values:[{x: '01-01-2022', y:1331.32}, {x:'01-02-2022', y:454.23}, {x:'01-03-2022', y:3214.2}], unit: 'R$', dimension:'UnB'},
  chartOptions: { values:[{x: '01-01-2022', y:312.11}, {x:'01-02-2022', y:2312}, {x:'01-03-2022', y:521.32}], unit: '', dimension:'UnB'},
  exportOptions: {
    location: 'Unb',
    dimension: 'Large',
    startDate: '12/02/2021',
    endDate: '12/02/2022',
  },
}