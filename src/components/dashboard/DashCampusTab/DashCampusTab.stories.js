import DashCampusTab from './DashCampusTab.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

export default {
  component: DashCampusTab,
  title: 'Components/DashCampusTab'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DashCampusTab },
  template: '<DashCampusTab v-bind="$props"/>'
})

export const DashCampusTabComponent = Template.bind({})
DashCampusTabComponent.args = {
  campi: [
    {
      "id":2,
      "name":"Faculdade do Gama",
      "acronym":"FGA",
      "transductors":2,
      "geolocation_latitude":-15.9894,
      "geolocation_longitude":-48.0443,
      "zoom_ratio":"16",
      "groups_related":[
        {
        "id":6,
        "name":"UED"
        },
        {
        "id":6,
        "name":"UED"
        }
      ],
      "url":"http://164.41.98.3:443/campi/2/"
    },
    {
      "id":1,
      "name":"Darcy Ribeiro - Gleba A",
      "acronym":"Darcy A",
      "transductors":11,
      "geolocation_latitude":-15.7636,
      "geolocation_longitude":-47.8694,
      "zoom_ratio":"16",
      "groups_related":[
        {
        "id":2,
        "name":"CPD"
        },
        {
        "id":2,
        "name":"CPD"
        },
        {
        "id":3,
        "name":"FT"
        },
        {
        "id":4,
        "name":"PAT"
        },
        {
        "id":3,
        "name":"FT"
        },
        {
        "id":3,
        "name":"FT"
        },
        {
        "id":1,
        "name":"ICC"
        },
        {
        "id":1,
        "name":"ICC"
        },
        {
        "id":1,
        "name":"ICC"
        },
        {
        "id":7,
        "name":"BSAN"
        },
        {
        "id":5,
        "name":"CEU"
        }
      ],
      "url":"http://164.41.98.3:443/campi/1/"
    }
  ] ,
}
