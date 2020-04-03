<template>
  <div id="q-app">
    <div class="text-center q-pa-lg" v-if="!dataLoaded">
      <q-spinner
          color="primary"
          size="3em"
        />
    </div>
    <div class="row q-pa-sm" v-if="dataLoaded">
      <div class="col-lg-2 col-xs-0"></div>
      <div class="col-xs-12 col-lg-8">
        <q-table
          title="Medidores"
          :data="transductors"
          :columns="columns"
          row-key="serial_number"
          :pagination.sync="pagination"
          :filter="filter"
          :rows-per-page-options="[15, 30, 60, 0]"
          binary-state-sortenable
          no-data-label="Nenhum medidor cadastrado"
          no-results-label="Nenhum medidor com esse filtro"
          rows-per-page-label="Itens por página"
          @row-click='(evt,row) => {clickItem(row)}'
        >
          <template v-slot:top-right>
            <q-input dark dense debounce="300" v-model="filter" placeholder="Filtrar">
              <q-icon slot="append" name="search" />
            </q-input>
          </template>

          <template v-slot:header="props">
            <q-tr class="meter-header-group">
              <q-th colspan="2"></q-th>
              <q-th colspan="3" class="meter-table-header-group-cell-grouped">Ocorrências</q-th>
              <q-th colspan="3"></q-th>
            </q-tr>
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-current_critical_events_count="props">
            <q-td :props="props">
              <q-chip v-if="props.value > 0" color="red" text-color="white">{{ props.value }}</q-chip>
              <template v-else>-</template>
            </q-td>
          </template>

          <template v-slot:body-cell-current_precarious_events_count="props">
            <q-td :props="props">
              <q-chip v-if="props.value > 0" color="amber">{{ props.value }}</q-chip>
              <template v-else>-</template>
            </q-td>
          </template>

          <template v-slot:body-cell-events_last72h="props">
            <q-td :props="props">
              <template v-if="props.value > 0">{{ props.value }}</template>
              <template v-else>-</template>
            </q-td>
          </template>

          <template v-slot:body-cell-grouping="props">
            <q-td :props="props">
              <div v-if="props.value.length == 0"> - </div>
              <div v-else class="" v-for="group in props.value" v-bind:key="group">
                {{ group }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-active="props">
            <q-td :props="props">
              <q-icon v-if="props.value == 1" name="flash_on" size="sm" class="text-green"></q-icon>
              <q-icon v-else name="flash_off" size="sm" class="text-red"></q-icon>
            </q-td>
          </template>
          <template v-slot:no-data="{ icon, message }">
            <div class="full-width row flex-center q-gutter-sm">{{ message }}</div>
          </template>
        </q-table>
      </div>
    </div>
    <div class="col-md-2 col-xs-0"></div>
  </div>
</template>

<script>
import MASTER from '../../services/masterApi/http-common'

export default {
  created () {
    this.getTransductors()
  },
  methods: {
    async getTransductors () {
      await MASTER
        .get(`energy-transductors-list/`)
        .then((res) => {
          this.transductors = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      this.dataLoaded = true
    },
    clickItem (row) {
      this.$router.push('transductor/' + row.serial_number)
    }
  },
  data () {
    return {
      dataLoaded: false,
      transductors: [],
      filter: '',
      pagination: {
        sortBy: 'campus',
        rowsPerPage: 15
      },
      columns: [
        {
          name: 'campus',
          label: 'Campus',
          align: 'left',
          field: 'campus',
          sortable: true
        },
        {
          name: 'name',
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'font-weight:bold'
        },
        {
          name: 'current_critical_events_count',
          align: 'center',
          label: 'Graves',
          field: 'current_critical_events_count',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'current_precarious_events_count',
          align: 'center',
          label: 'Leves',
          field: 'current_precarious_events_count',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },

        {
          name: 'events_last72h',
          align: 'center',
          label: 'Últ. 72h',
          field: 'events_last72h',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'grouping',
          align: 'left',
          label: 'Grupos',
          field: 'grouping',
          sortable: true
        },
        {
          name: 'active',
          align: 'center',
          label: 'Ativo',
          field: 'active',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'model',
          align: 'left',
          label: 'Modelo',
          field: 'model',
          sortable: true
        }
      ]
    }
  }
}
</script>

<style>
  .q-table__top,
  thead tr th {
    background-color: #00417e !important;
    color: #fff;
    font-size: 1em !important;
  }

  thead tr.meter-header-group {
    height: 1em;
  }

  thead tr.meter-header-group th {
    border: none;
    padding: 0 0 4px;
  }

  .meter-header-group th.meter-table-header-group-cell-grouped {
    border-bottom: solid 1px #527ea7;
  }
</style>
