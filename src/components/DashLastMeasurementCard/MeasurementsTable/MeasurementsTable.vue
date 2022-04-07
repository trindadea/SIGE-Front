<template>
  <tr class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
    <span class="row">
      <th class="col-12 h4">
        {{ title }}
      </th>
      <td v-for="(key, index) in tableKeys" class="col-12 reading-measurement" v-bind:key="index">
        {{renderKey(key)}} {{getTableValues(index)}} {{getUnit(index)}}
        <q-icon v-if="icons" :style="{opacity: 0.5}" :name="icons[index]"/>
      </td>
    </span>
  </tr>
</template>

<script>

export default {
  name: 'MeasurementsTable',
  props: {
    title:{
      type: String
    },
    tableObject:{
      type: Object
    },
    unit: {
      type: [Array,String]
    },
    realTimeMesure: {
      type: Object
    },
    icons: {
      type: Array
    }
  },

  data () {
    return {
      tableKeys: Object.keys(this.tableObject),
      tableValues: Object.values(this.tableObject),
    }
  },

  methods:{
    getUnit(index){
      return Array.isArray(this.unit) ? this.unit[index] : this.unit;
    },
    
    getTableValues(index){
      if(!this.icons) return this.realTimeMesure[this.tableValues[index]].toFixed(0)
      return this.tableValues[index];
    },
    renderKey(key) {
      if(!this.icons) return key + ':'
    }
  }
}
</script>
