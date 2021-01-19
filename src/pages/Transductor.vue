<template>
  <div class="row">
    <div class="col-9">
      <div class="row">
        <measurements-box class="col-8" :id="id"/>
        <active-box class="col-3" :id="id"/>
      </div>
      <graph :transductorId='id'/>
      <q-separator spaced inset/>
      <div class="row">
        <div class="transductor-info col-3">
          <p class="title">Dados do medidor</p>
          <a class="data-label">MODELO</a><br/>
          <a class="data-body">{{model}}</a><br/>
          <a class="data-label">NÚM. DE SÉRIE</a><br/>
          <a class="data-body">{{serial_number}}</a><br/>
          <a class="data-label">GRUPOS</a><br/>
          <a class="data-body" v-for="(group, i) in groups" v-bind:key="i"> {{group}}, </a>
        </div>
        <div class="transductor-info col-9">
          <p class="title">Histórico</p>
          <p class="history">{{history}}</p>
        </div>
      </div>
    </div>
    <occurences :id="id" class="col-3"/>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
import measurementsBox from '../components/MeasurementsBox'
import activeBox from '../components/ActiveBox'
import occurences from '../components/Occurences'
import graph from '../components/Graph'
import { mapActions } from 'vuex'

export default {
  name: 'Transductor',
  components: {
    measurementsBox: measurementsBox,
    activeBox: activeBox,
    occurences: occurences,
    graph: graph
  },
  data () {
    return {
      id: this.$router.currentRoute.params.id,
      model: '',
      serial_number: '',
      groups: [],
      history: ''
    }
  },
  created () {
    const id = this.$router.currentRoute.params.id
    MASTER
      .get('/energy-transductors/' + id)
      .then((res) => {
        this.model = res.data.model
        this.history = res.data.history
        this.serial_number = res.data.serial_number
        res.data.grouping.forEach(group => {
          this.groupRequest(group)
        })
        this.changePage(res.data.name)
      })
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    groupRequest (url) {
      MASTER
        .get(url)
        .then((res) => {
          this.groups.push(res.data.name)
        })
    }
  }
}
</script>

<style lang="scss" scopped>
.transductor-info {
  padding: 20px;
}

.title {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #00417e;
}

.data-label {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 2px;
  color: #00417e;
}

.history {
  text-align: justify;
}
</style>
