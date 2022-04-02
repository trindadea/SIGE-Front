import GroupsDialog from './GroupsDialog'

export default {
  title: 'Example/GroupsDialog',
  component: GroupsDialog
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GroupsDialog },
  template:
    '<groups-dialog :dialog="dialog" :types="types" :groups="groups"/>'
})

export const GroupsDialogComponent = Template.bind({})
GroupsDialogComponent.args = {
  dialog: "dialog",
  types: [ { "id": 2, "name": "Gleba", "url": "http://164.41.98.3:443/group-types/2/" }, { "id": 1, "name": "Prédio", "url": "http://164.41.98.3:443/group-types/1/" } ],
  groups: {}
}
