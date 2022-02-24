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
<<<<<<< HEAD
<<<<<<< HEAD
  selectedCampus: { id: 2 },
=======
  selectedCampus: {id: 2},
>>>>>>> 763afcc (#53 - Addition of the 'ChargeBarChart' component storybook)
=======
  selectedCampus: { id: 2 },
>>>>>>> 8c68396 (#53 - Pipeline error fix)
  selectedTransductor: undefined
}
