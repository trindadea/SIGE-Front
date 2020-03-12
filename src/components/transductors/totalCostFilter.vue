<template>
  <div class="containerFilter">
    <div class="adjust">
      <div class="filter">
        <q-select
          v-model="allOptionsCampus"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Campus"
          :options="optionsCampus"
          @filter="filterCampus"
          class="elem campus"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="allOptions"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Filtro"
          :options="options"
          @filter="filterFn"
          class="col-4 elem"
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
          {label: 'DIA', value: 'day'},
          {label: 'MÊS', value: 'month'},
          {label: 'ANO', value: 'year'}
        ]"
          />
        </div>
        <q-input v-model="startDate" :mask="mask" label="Período: Início" class="elem">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="startDate" mask="DD/MM/YYYY" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="endDate" :mask="mask" label="Período: Fim" class="elem">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="endDate" mask="DD/MM/YYYY" />
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

export default {
  name: 'TotalCostFilter',
  data () {
    return {
      model: 'day',
      allOptionsCampus: [],
      optionsCampus: this.allOptionsCampus,
      allOptions: [],
      options: this.allOptions,
      startDate: '',
      endDate: '',
      mask: '##/##/####',
      value: false
    }
  },
  async created () {
    await HTTP.get('campi/')
      .then(res => {
        console.log(res.data)
        res.data.forEach(elem => {
          this.allOptionsCampus.push(elem.name)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.allOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCampus (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCampus = this.allOptionsCampus.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
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
</style>
