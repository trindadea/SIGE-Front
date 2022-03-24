import GroupsDialog from './GroupsDialog'

export default {
  title: 'Example/GroupsDialog',
  component: GroupsDialog
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GroupsDialog },
  template:
    '<groups-dialog :selectedCampus="selectedCampus" :selectedTransductor="selectedTransductor" />'
})

export const GroupsDialogComponent = Template.bind({})
GroupsDialogComponent.args = {
  selectedCampus: { id: 2 },
  selectedTransductor: undefined
}
