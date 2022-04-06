<template>
  <tr class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
    <span class="row">
      <th class="col-12 h4">
        {{ title }}
      </th>
      <td v-for="(key, index) in tableKeys" class="col-12 reading-measurement" v-bind:key="index">
        {{key}}: {{tableData[tableValues[index]].toFixed(0)}} {{getUnit(index)}}
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
    keyNames:{
      type: Object
    },
    unit: {
      type: [Array,String]
    },
    tableData: {
      type: Object
    }
  },

  data () {
    return {
      tableKeys: Object.keys(this.keyNames),
      tableValues: Object.values(this.keyNames),
    }
  },

  methods:{
    getUnit(index){
      return Array.isArray(this.unit) ? this.unit[index] : this.unit;
    }
  }
}
</script>
