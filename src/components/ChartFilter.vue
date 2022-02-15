<template>
  <div class="row container">
    <q-select
      v-model="option"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :label="filterLabel"
      :options="options"
      @filter="filterFn"
      class="col-4 elem"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            Sem resultados
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div class="col elem">
      <a class="caption">Visão</a><br/>
      <q-btn-toggle
        v-model="vision"
        class="vision-button"
        unelevated
        toggle-color="primary"
        :options="visionOptions"
      />
    </div>
    <q-input v-model="startDate" label="Período: Início" class="col-2 elem">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer calendar">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="startDate" mask="DD/MM/YYYY" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input v-model="endDate" label="Período: Fim" class="col-2 elem">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer calendar">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="endDate" mask="DD/MM/YYYY" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="col-1 elem">
    <q-btn color="primary" text-color="white" label="Aplicar" class="apply-button" v-on:click="applyFilter()"/>
    </div>
  </div>
</template>
<script>
import { getGraph } from '../utils/transductorGraphControl'
import { mapActions, mapGetters } from 'vuex'
import { getDateNowSelectFormat } from '../utils/transductorStatus'

export default {
  name: 'ChartFilter',
  props: [
    'filterLabel',
    'filterList',
    'visionOptions',
    'transductorId'
  ],
  data () {
    return {
      option: '',
      options: [],
      vision: null,
      startDate: '',
      endDate: ''
    }
  },

  created () {
    this.vision = this.visionOptions[0].value
    this.options = this.filterList
    this.option = this.filterOptions.dimension
    this.startDate = getDateNowSelectFormat(1)
    this.endDate = getDateNowSelectFormat()

    this.applyFilter()
  },

  computed: {
    ...mapGetters('transductorStore', ['filterOptions'])
  },
  methods: {
    ...mapActions('transductorStore', ['updateFilter', 'updateChartPhase']),
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.filterList.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },

    async applyFilter () {
      const filter = {
        transductor: this.transductorId,
        dimension: this.option,
        vision: this.vision,
        startDate: this.startDate,
        endDate: this.endDate
      }

      const graphOpt = await getGraph(filter)
      await this.updateFilter(filter)
      await this.updateChartPhase(graphOpt)
    }
  }
}
</script>
<style lang="scss" scoped>
.vision-button{
  border: 1px solid $primary;
  color:rgba(0, 0, 0, 0.38);
}
.calendar{
  color: rgba(0, 0, 0, 0.54);
}
.container{
  display: flex;
  padding: 20px;
  align-content: center;
  justify-content: center;

}
.elem{
  margin: 10px;
}
.caption {
  width: 34px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.6);
}

.apply-button{
  margin: 5px;
  margin-top:20px;
}
</style>
