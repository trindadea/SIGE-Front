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
          @input="getGroups(); filterByCampus(campusModel)"
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
          @input="filterByGroup(optionsModel)"
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
          {label: 'MES', value: 'monthly'},
          {label: 'ANO', value: 'yearly'}
        ]"
        @input="changePeriodicity(model)"
          />
        </div>
        <q-input v-model="startDate" :mask="mask" label="Período: Início" class="elem input" :error="errorStartDate" @input="verifyClearInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeStartDate(startDate)" v-model="startDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="endDate" :mask="mask" label="Período: Fim" class="elem input" :error="errorEndDate" @input="verifyClearInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date @input="changeEndDate(endDate)" v-model="endDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn
            class="apply_button"
            size="1rem"
            label="Aplicar"
            type="button"
            v-bind:loading="getChartLoadingStatus"
            @click="applyFilter()"
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
import { getGraphInformation } from '../../utils/graphControl'
import { mapActions, mapGetters } from 'vuex'
import CampiService from '../../services/CampiService'
import moment from 'moment'

let allCampus = []
const campiService = new CampiService()
export default {
  name: 'ConsumptionFilter',
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
    this.startDate = moment().format('DD/MM/YYYY')
    this.endDate = moment().format('DD/MM/YYYY')
    const serie = () => getGraphInformation(this.getFilters)
    this.updateChartSerie(serie)
  },
  computed: {
    ...mapGetters('consumptionCurve', ['errorStartDate', 'errorEndDate', 'getFilters', 'getChartLoadingStatus'])
  },
  methods: {
    ...mapActions('consumptionCurve', ['changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'clearEndDate', 'updateChartSerie', 'getChartLoadingStatus']),
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCampus (val, update, abort) {
      update(async () => {
        const needle = val.toLowerCase()
        this.optionsCampus = await allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    getGroups () {
      this.optionsGroup = []
      this.optionsModel = null
      const filteredCampus = allCampus.find(campus => campus.id === this.campusModel)
      filteredCampus.groups_related.forEach(group => {
        const campusExistsInGroup = this.optionsGroup.find(subGroup => subGroup.name === group.name)
        if (!campusExistsInGroup) {
          this.optionsGroup.push(group)
        }
      })
    },

    verifyClearInput () {
      if (!this.startDate) {
        this.clearStartDate()
      } else {
        if (moment(this.startDate, 'DD-MM-YYYY').isValid()) {
          this.changeStartDate(this.startDate)
        }
      }

      if (!this.endDate) {
        this.clearEndDate()
      } else {
        if (moment(this.endDate, 'DD-MM-YYYY').isValid()) {
          this.changeEndDate(this.endDate)
        }
      }
    },

    async applyFilter () {
      const serie = () => getGraphInformation(this.getFilters)
      this.updateChartSerie(serie)
      if (isNaN(this.campusModel)) {
        this.$parent.location.campus = this.campusModel.acronym
      } else {
        this.$parent.location.campus = this.optionsCampus.find(campus => campus.id === this.campusModel).acronym
      }

      if (this.optionsModel) {
        this.$parent.location.group = this.optionsGroup.find(group => group.id === this.optionsModel).name
      } else {
        this.$parent.location.group = null
      }
    }
  }
}
</script>

<style scoped>
  @import './style.scss';
</style>
