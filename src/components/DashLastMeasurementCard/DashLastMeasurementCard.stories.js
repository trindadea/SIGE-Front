import DashLastMeasurementCard from '.'

export default {
  title: 'Dash Last Measurement Card',
  component: DashLastMeasurementCard,
  argTypes: {
    transductor: {type: Object},
    transductor_occurences: {type: Object},
    realTimeMeasurements: {type: Array},
    measurementsCallback: {type: Function}
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DashLastMeasurementCard },
  template: '<dash-last-measurement-card v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  transductor: {
    name: 'FGA - Gama'
  },
  transductor_occurences: {},
  realTimeMeasurements: [{voltage_a: 134 ,voltage_b: 32, voltage_c: 131}],
  measurementsCallback: () => {},
  reports: {
    precarious_tension: [1, 23, 4, 6],
    transductor_connection_fail: [1, 23, 4, 6],
    slave_connection_fail: [1, 23, 4, 6],
    critical_tension: [1],
    phase_drop: [1]
  }
}
