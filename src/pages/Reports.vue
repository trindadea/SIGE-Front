<template>
  <div class="q-pa-md">
    <total-cost-filter />
    <q-table
      title="Relatório por Período"
      :data="data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
    >
<!--       <template v-slot:bottom>
        Bottom
      </template> -->
    </q-table>
  </div>
</template>

<script>
// import MASTER from '../services/masterApi/http-common'
import TotalCostFilter from '../components/TotalCostFilter'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Report',
  components: {
    TotalCostFilter
  },
  computed: {
    ...mapGetters('totalCostStore', ['totalCostChart'])
  },
  methods: {
    ...mapActions('userStore', ['changePage']),
    clickItem (row) {
      this.$router.push('transductor/' + row.serial_number)
    }
  },
  created () {
    this.changePage('Relatório')
  },
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Item',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'valor_kwh', align: 'right', label: 'Valor', field: 'valor_kwh', sortable: true },
        { name: 'tarifa', label: 'Tarifa (R$ / kWh)', field: 'tarifa', sortable: true },
        { name: 'total', label: 'Total (R$)', field: 'total' }
      ],
      data: [
        {
          name: 'Consumo (Ponta)',
          valor_kwh: '6.966 kWh',
          tarifa: '1,5612835',
          total: '10.875,90'
        },
        {
          name: 'Consumo (Fora de Ponta)',
          valor_kwh: '47.856 kWh',
          tarifa: '0,5354221',
          total: '25.623,16'
        },
        {
          name: 'Demanda Contratada',
          valor_kwh: '188 kW',
          tarifa: '12,2165430',
          total: '2.296,71'
        },
        {
          name: 'Demanda máxima',
          valor_kwh: '226 kW',
          tarifa: '-',
          total: ''
        },
        {
          name: 'Ultrapassagem de demanda',
          valor_kwh: '38 kW',
          tarifa: '24,4330860',
          total: '928,25'
        },
        {
          name: 'UFER (Ponta)',
          valor_kwh: 113,
          tarifa: '0.4017719',
          total: '45,40'
        },
        {
          name: 'UFER (Fora de Ponta)',
          valor_kwh: 0,
          tarifa: '-',
          total: '0,00'
        },
        {
          name: 'Energia Gerada',
          valor_kwh: '18.930 kWh',
          tarifa: '0,530000',
          total: '- 10.032,90'
        },
        {
          name: 'Total',
          valor_kwh: '-',
          tarifa: '-',
          total: '29.736,52'
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
