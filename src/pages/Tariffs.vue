<template>
  <div>
    <h3 class="title">Lista de Campi</h3>
    <div class="container">
      <div class="q-pa-md">
        <q-table
          title="Campi"
          :data="campi"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
              <q-tr :props="props" @click="goTo(props.row.id)">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
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
  name: 'Campi',
  data () {
    return {
      campi: [],
      campus: {},
      columns: [
        { name: 'id', label: 'ID', align: 'left', field: row => row.id, sortable: true, style: 'width: 55px' },
        { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true }
      ]
    }
  },
  created () {
    this.getCampi()
  },
  methods: {
    getCampi () {
      MASTER
        .get('campi/', {})
        .then(res => {
          this.campi = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    goTo (id) {
      this.$router.push(`/tariffs/${id}`)
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
  cursor: pointer;
}
</style>
