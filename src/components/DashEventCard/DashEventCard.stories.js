import DashEventCard from './index.js'

export default {
  title: 'Dash Event Card',
  component: DashEventCard,
  argTypes: {
    name: { type: 'string' },
    activeClass: { type: 'string' },
    eventsList: { type: 'array' },
    icon: { type: 'number' },
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DashEventCard },
  template: '<dash-event-card v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  name: 'Queda de Fase',
  activeClass: 'Eventos',
  eventsList: [
    {
      id: 1,
      location: 'Gama',
      campus: 'FGA',
      transductor: 'FGA - 2',
      data: {
        voltage_a: 1, 
        voltage_b: 1, 
        voltage_c: 1, 
      },
    },
  ],
  icon: 1
}