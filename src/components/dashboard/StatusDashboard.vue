<template>
  <q-page>
    <section
      id="summary-status"
      class="q-py-md">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Resumo do sistema
      </h4>
      <q-separator/>
      <div
        id="cards"
        class="row">
        <d-status-card
          class="col-sm-6 col-md-3"
          v-for="item in items"
          :key="item.id"
          :maxValue="item.maxValue"
          :value="item.value"
          :title="item.name"/>
      </div>
    </section>
    <section id="transductor-status">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Estado dos transdutores
      </h4>
      <div class="row" id="table1">
        <q-table
          class="col q-ma-md"
          :data="allTransductors"
          :columns="transColumns"
          row-key="name"
          color="white"
          dark
        />
      </div>

      <q-separator/>
      <div>

      </div>
    </section>
    <section id="slave-status">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Estado dos servidores escravos
      </h4>
      <q-separator/>
      <div>
        <q-table
          class="col q-ma-md"
          :data="slaves"
          :columns="slavesColumns"
          row-key="name"
          color="white"
          dark
        />
      </div>
    </section>
    <!-- <section id="database-status">
      <div>

      </div>
    </section> -->
  </q-page>
</template>

<script>
import axios from 'axios'
import DashboardSummaryStatusCard from 'components/dashboard/DashboardSummaryStatusCard.vue'

export default {
  name: 'StatusDashboard',

  components: {
    'd-status-card': DashboardSummaryStatusCard
  },

  data () {
    return {
      activeTransductors: {
        count: 0,
        results: []
      },

      slaves: [],

      data_count: 0,

      loading: false,

      allTransductors: [],

      transColumns: [
        { name: 'serial_number', required: true, label: 'Nº série', align: 'left', field: 'serial_number' },
        { name: 'ip_address', required: true, label: 'IP', align: 'left', field: 'ip_address' },
        { name: 'physical_location', label: 'Local', field: 'physical_location' },
        { name: 'broken', label: 'Danificado', field: 'broken' },
        { name: 'active', label: 'Ativo', field: 'active', format: (val, row) => { return val ? 'ONLINE' : 'OFFLINE' } }
        // { name: 'installation_date', label: 'Data instalação', field: 'installation_date' }
      ],

      slavesColumns: [
        { name: 'location', required: true, label: 'Localização', align: 'left', field: 'location' },
        { name: 'ip_address', required: true, label: 'IP', align: 'left', field: 'ip_address' },
        { name: 'port', label: 'Porta', field: 'port' },
        { name: 'status', label: 'Ativo', field: 'status', format: (val, row) => { return val ? 'ONLINE' : 'OFFLINE' } }
      ]
    }
  },

  computed: {
    items () {
      let result = []
      let other = this.activeTransductors.results.filter(t => t.active)

      result.push(
        {
          name: 'Transdutores',
          maxValue: this.activeTransductors.count,
          value: other.length
        },
        {
          name: 'Servidores',
          maxValue: this.slaves.length,
          value: this.slaves.length
        }
      )

      return result
    }
  },

  methods: {
    getTransductors () {
      this.loading = true

      axios
        .get(`http://localhost:8000/active_transductors`)
        .then((res) => {
          this.loading = false
          this.activeTransductors = res.data
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          this.status = 'failed'
        })
    },

    getSlaves () {
      this.loading = true

      // axios
      //   .get(`http://localhost:8000/slaves`)
      //   .then((res) => {
      //     console.log(res)
      //     this.slaves = res.data.results
      //     this.loading = false
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     this.loading = false
      //     this.status = 'failed'
      //   })

      this.loading = false

      this.slaves = [
        { location: 'Locale 1', ip_address: '123.232.31.2', port: 80, status: true },
        { location: 'Locale 2', ip_address: '123.232.31.2', port: 80, status: false },
        { location: 'Locale 3', ip_address: '123.232.31.2', port: 80, status: true },
        { location: 'Locale 4', ip_address: '123.232.31.2', port: 80, status: false },
        { location: 'Locale 5', ip_address: '123.232.31.2', port: 80, status: true },
        { location: 'Locale 6', ip_address: '123.232.31.2', port: 80, status: false },
        { location: 'Locale 7', ip_address: '123.232.31.2', port: 80, status: true }
      ]
    },

    getAllTransductors () {
      axios
        .get(`http://localhost:8000/energy_transductors`)
        .then(res => {
          this.allTransductors = res.data.results
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  beforeMount () {
    this.getTransductors()
    this.getSlaves()
    this.getAllTransductors()
  }

}
</script>

<style>

</style>
