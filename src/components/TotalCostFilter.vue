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
import MASTER from '../services/masterApi/http-common'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { dimensions } from '../utils/transductorGraphControl'

let allCampus = []

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
    allCampus = await this.getAllCampiInfo()
    this.optionsCampus = allCampus
    this.getChart()
  },
  computed: {
    ...mapGetters('totalCostStore', ['errorStartDate', 'errorEndDate', 'getUrl'])
  },
  methods: {
    ...mapActions('totalCostStore', ['changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'clearEndDate', 'updateChart']),
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    filterCampus (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = allCampus.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    async getAllCampiInfo () {
      try {
        const { data: campiData } = await MASTER.get('campi/')
        console.log('da função asyncrona ->', campiData)
        return campiData
      } catch (error) {
        return []
      }
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
      MASTER
        .get(this.getUrl)
        .then((res) => {
          var chart = {
            values: res.data.cost,
            min: res.data.min,
            max: res.data.max,
            status: true,
            unit: 'R$',
            dimension: dimensions[1]
          }
          this.updateChart(chart)
          this.$parent.location.campus = this.optionsCampus.find(campus => campus.id === this.campusModel).acronym
          this.$parent.location.group = this.optionsGroup.find(group => group.id === this.optionsModel).name
        })
        .catch((err) => {
          console.log('catch', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.containerFilter {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
}
.adjust {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.filter {
  background-color: white;
  display: flex;
  align-items: initial;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 1%;
  width: 100%;
  padding: 0;
}
.input {
  padding-bottom: 0;
}
.calendar {
  color: rgba(0, 0, 0, 0.54);
}
.elem {
  margin: 1.7%;
}
.caption {
  font-family: Roboto;
  font-size: 1.8vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 3.5%;
}
.toggle {
  margin-top: 1%;
  border: 1px solid $primary;
  border-color: $primary;
}
.vision {
  align-self: center;
}
.campus {
  width: 18%;
}
.subtitle {
  font-family: Roboto;
  font-size: 1.8vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.87);
}
.adjust-toggle {
  display: flex;
  margin-left: 39%;
  margin-top: -1.5%;
}
.select {
  max-width: 20%;
}
.input {
  padding-bottom: 0;
}
.apply_button {
  height: 40px;
  margin-top: auto;
  margin-bottom: 1.7%;
  margin-left: 1.7%;
}
</style>
