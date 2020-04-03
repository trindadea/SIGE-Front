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
          {label: 'MÊS', value: 'monthly'},
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
      </div>
    </div>
    <div class="adjust-toggle">
      <q-toggle v-model="value" />
      <a class="subtitle">Ajustar para datas de faturamento</a>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
const allCampus = []
const groups = []

export default {
  name: 'TotalCostFilter',
  data () {
    return {
      model: 'daily',
      campusModel: null,
      optionsCampus: allCampus,
      optionsModel: null,
      optionsGroup: groups,
      startDate: '',
      endDate: '',
      mask: '##/##/####',
      value: false
    }
  },
  props: {},
  async created () {
    await HTTP.get('campi/')
      .then(res => {
        res.data.forEach(elem => {
          allCampus.push(elem)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    ...mapGetters('totalCostStore', ['errorStartDate', 'errorEndDate'])
  },
  methods: {
    ...mapActions('totalCostStore', ['changePeriodicity', 'changeStartDate', 'changeEndDate', 'filterByCampus', 'filterByGroup', 'clearStartDate', 'clearEndDate']),
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
    getGroups () {
      while (groups.length) {
        groups.pop()
      }
      this.optionsModel = null
      allCampus.filter(campus => campus.id === this.campusModel)[0].groups_related.map(group => {
        if (groups.filter(subGroup => subGroup.name === group.name).length === 0) {
          groups.push(group)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.containerFilter {
  background-color: white;
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
  width: 75%;
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
  margin-left: 39%;
  margin-top: -1.5%;
}
.select {
  max-width: 20%;
}
.input {
  padding-bottom: 0;
}
</style>
