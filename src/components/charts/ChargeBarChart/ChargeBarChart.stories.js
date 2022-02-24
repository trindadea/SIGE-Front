import ChargeBarChart from './ChargeBarChart'

export default {
  title: 'Example/ChargeBarChart',
  component: ChargeBarChart
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ChargeBarChart },
  template:
    '<charge-bar-chart :selectedCampus="selectedCampus" :selectedTransductor="selectedTransductor" />'
})

export const ChargeBarChartComponent = Template.bind({})
ChargeBarChartComponent.args = {
  selectedCampus: {id: 2},
  selectedTransductor: undefined
}
