<template>
  <div>
    <h3 class="title">Lista de Campi </h3>
    <div class="container">
      <div class="q-pa-md">
        <q-table
          title="Tarifas"
          :data="tariffs"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="regular_tariff" :props="props">{{ props.row.regular_tariff }}</q-td>
                <q-td key="high_tariff" :props="props">{{ props.row.high_tariff }}</q-td>
                <q-td key="start_date" :props="props">{{ props.row.start_date }}</q-td>
              </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'

export default {
  data () {
    return {
      tariffs: [],
      campus: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'regular_tariff', label: 'Tarifa Regular', align: 'left', field: row => row.regular_tariff, sortable: true },
        { name: 'high_tariff', label: 'Tarifa de Ponta', align: 'left', field: row => row.high_tariff, sortable: true },
        { name: 'start_date', label: 'Data de início', align: 'left', field: row => row.start_date, sortable: true }
      ]
    }
  },
  created () {
    this.getTariffs()
  },
  methods: {
    getTariffs () {
      MASTER
        .get(`campi/${this.$route.params.id}/tariffs`, {})
        .then(res => {
          console.log(res.data)
          this.tariffs = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  font-size             : 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.info {
  border      : 1px solid $primary;
  padding     : 20px;
  padding-top : 0px;
}
.title {
  text-align      : center;
  padding-top     : 0px;
  padding-bottom  : 20px;
}
.btn {
  margin-top  : 24px;
  margin-left : 10px;
  text-align  : right;
}
.inputDiv {
  display     : flex;
  align-items : center;
}
.inputField {
  flex          : 1;
  padding-left  : 10px
}
.q-tr {
  cursor: pointer !important;
}
</style>
