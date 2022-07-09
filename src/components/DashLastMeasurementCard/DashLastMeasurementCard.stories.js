import DashLastMeasurementCard from '.'

export default {
  title: 'Dash Last Measurement Card',
  component: DashLastMeasurementCard,
  argTypes: {
    transductor: {type: Object},
    transductor_occurences: {type: Object},
    realTimeMeasurements: {type: Object},
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
  transductor_occurences: {
    count: 1245,
    precarious_tension: [1, 23, 4, 6],
    transductor_connection_fail: [1, 23, 4, 6],
    slave_connection_fail: [1, 23, 4, 6, 4],
    critical_tension: [1],
    phase_drop: [1]
  },
  realTimeMeasurements: {
    voltage_a: 13.34 ,
    voltage_b: 32.312, 
    voltage_c: 131.3124,
    current_a: 113.34 ,
    current_b: 332.312, 
    current_c: 151.1124,
    total_active_power: 312.1,
    total_reactive_power: 3214.134,
    total_power_factor: 6541.23
  },
  measurementsCallback: () => {},
}
