<template>
  <div class="containerFilter">
    <div class="adjust">
      <div class="filter">
        <q-select
          v-model="campusModel"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Campus"
          :options="optionsCampus"
          @filter="filterCampus"
          class="col-4 elem select"
          @input="getGroups(); filterByCampus(campusModel);"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

          <q-select
          v-model="optionsModel"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Filtro"
          :options="optionsGroup"
          @filter="filterFn"
          class="col-4 elem select"
          @input="filterByGroup(optionsModel);"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="vision">
          <a class="caption">Visão</a>
          <br />
          <q-btn-toggle
            v-model="model"
            toggle-color="primary"
            class="elem toggle"
            :options="[
          {label: 'DIA', value: 'daily'},
          {label: 'MÊS', value: 'monthly'},
          {label: 'ANO', value: 'yearly'}
        ]"
        @input="changePeriodicity(model);"
          />
        </div>
        <q-input v-model="startDate" :mask="mask" label="Período: Início" class="elem input" :error="errorStartDate" @input="verifyClearInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeStartDate(startDate);" v-model="startDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="endDate" :mask="mask" label="Período: Fim" class="elem input" :error="errorEndDate" @input="verifyClearInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeEndDate(endDate);" v-model="endDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn
            class="apply_button"
            size="1rem"
            label="Aplicar"
            type="button"
            @click="getChart()"
            color="primary"
        />
      </div>
    </div>
    <div class="adjust-toggle">
      <q-toggle v-model="value" />
      <a class="subtitle">Ajustar para datas de faturamento</a>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { dimensions } from '../../utils/transductorGraphControl'
import CampiService from '../../services/CampiService'
import ChartService from '../../services/ChartService'

let allCampus = []
const campiService = new CampiService()
const chartService = new ChartService()

export default {
  name: 'TotalCostFilter',
  data () {
    return {
      model: 'daily',
      campusModel: null,
      optionsCampus: allCampus,
      optionsModel: null,
      optionsGroup: [],
      startDate: '',
      endDate: '',
      mask: '##/##/####',
      value: false
    }
  },
  props: {},
  async created () {
    allCampus = await campiService.getAllCampiInfo()
    this.optionsCampus = allCampus
    this.getChart()
  },
  computed: {
    ...mapGetters('totalCostStore', ['errorStartDate', 'errorEndDate', 'getUrl'])
  },
  methods: {
    ...mapActions('totalCostStore', ['changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'clearEndDate', 'updateChart']),
    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCampus (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    getGroups () {
      const updatedGroups = []
      const selectedCampus = allCampus.find(campus => campus.id === this.campusModel)
      selectedCampus.groups_related.forEach(group => {
        const alreadyInUpdatedGroups = updatedGroups.find(subGroup => subGroup.name === group.name)
        if (!alreadyInUpdatedGroups) {
          updatedGroups.push(group)
        }
      })
      this.optionsModel = null
      this.optionsGroup = updatedGroups
    },

    verifyClearInput () {
      if (!this.startDate) {
        this.clearStartDate()
        this.getChart()
      } else {
        if (moment(this.startDate, 'DD-MM-YYYY').isValid()) {
          this.changeStartDate(this.startDate)
          this.getChart()
        }
      }

      if (!this.endDate) {
        this.clearEndDate()
        this.getChart()
      } else {
        if (moment(this.endDate, 'DD-MM-YYYY').isValid()) {
          this.changeEndDate(this.endDate)
          this.getChart()
        }
      }
    },
    getChart () {
      chartService.getChartData(this.getUrl, 'R$', dimensions[1])
        .then((chart) => {
          this.updateChart(chart)
          this.$parent.location.campus = this.optionsCampus.find(campus => campus.id === this.campusModel).acronym
          this.$parent.location.group = this.optionsGroup.find(group => group.id === this.optionsModel).name
        })
        .catch(() => console.log('Falha ao atualizar o gráfico!'))
    }
  }
}

</script>

<style lang="scss" scoped src='./styles.scss'/>
