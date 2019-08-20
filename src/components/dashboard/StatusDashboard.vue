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
      loading: false
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
        }
      )

      return result
    }
  },

  watch: {
    active () {
      this.activeTransductors = this.active
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

      axios
        .get(`http://localhost:8000/slaves`)
        .then((res) => {
          console.log(res)
          this.slaves = res.data.results
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          this.status = 'failed'
        })
    }
  },

  beforeMount () {
    this.getTransductors()
  }

}
</script>

<style>

</style>
