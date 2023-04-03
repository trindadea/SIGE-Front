import ReportIcon from '.'

export default {
  title: 'Report Icon',
  component: ReportIcon,
  argTypes: {
    label: { type: 'string' },
    reports: { type: 'object' },
    critical: { type: 'boolean' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReportIcon },
  template: '<report-icon v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Leves',
  critical: false,
  reports: {
    precarious_tension: [1, 23, 4, 6],
    transductor_connection_fail: [1, 23, 4, 6],
    slave_connection_fail: [1, 23, 4, 6],
    critical_tension: [1],
    phase_drop: [1]
  }
}
