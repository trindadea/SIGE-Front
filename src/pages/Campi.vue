<template>
  <div>
    <h3>Lista de Campi </h3>
    <div class="container">
      <div class="lst-campi">
        <ul>
          <li v-for="(campi,index) in campis" :key="index">
            <p class="lst-item">
              {{index}} - {{campi.name}} - {{campi.acronym}}
            <q-btn
              size="1rem"
              label="show"
              @click="getCampi(campi.id)"
              color="primary"/>
              </p>
          </li>
        </ul>
      </div>
      <div class="campi-info">
        <p>Id: {{campi.id}}</p>
        <p>Name: {{campi.name}}</p>
        <p>Acronym: {{campi.acronym}}</p>
        <p>Transductors: {{campi.transductors}}</p>
        <q-btn
        size="1rem"
        label="Delete"
        @click="deleteCampi(campi.id)"
        color="primary"/>
      </div>
    </div>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
// import { mapActions } from 'vuex'

export default {
  name: 'Campis',
  data () {
    return {
      campis: [],
      campi: {}
    }
  },
  created () {
    this.getCampis()
  },
  methods: {
    // ...mapActions(),
    getCampis () {
      MASTER
        .get('campi/', {})
        .then(res => {
          console.log(res.data)
          this.campis = res.data
        })
        .catch(err => {
          this.err = err
          console.log('err')
        })
    },
    getCampi (id) {
      MASTER
        .get('campi/' + id, {})
        .then(res => {
          console.log(res.data)
          this.campi = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCampi (id) {
      MASTER
        .delete('campi/' + id, {})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.container {
  display               : grid;
  font-size: 25px;
  grid-template-columns : 30% 1fr;
  gap                   : 10px;
  height                : 100vh;
  max-width             : 100vw;
  padding               : 10px;;
}
.campi-info {
  padding: 20px;
}

</style>
