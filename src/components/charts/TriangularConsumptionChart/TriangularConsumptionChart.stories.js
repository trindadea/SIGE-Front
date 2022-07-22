import TriangularConsumptionChart from './TriangularConsumptionChart'

export default {
  title: 'Example/TriangularConsumptionChart',
  component: TriangularConsumptionChart
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TriangularConsumptionChart },
  template:
    '<triangular-consumption-chart/>'
})

export const TriangularConsumptionChartComponent = Template.bind({})
