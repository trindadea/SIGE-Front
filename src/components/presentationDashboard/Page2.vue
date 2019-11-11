<template>
  <div class="container q-py-lg bg-white">
    <!-- inner loading not working properly -->
    <q-inner-loading :showing="loading">
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </q-inner-loading>

    <h2 class="text-center text-grey-10"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeIn"
    >
      {{ this.transductor.location }}
    </h2>

    <!-- {{this.transductor}} -->

    <section
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeIn"
    >
      <div class="row">
        <div class="col-12 col-md-6">
          <bar-chart
            title="Consumo/geração de energia"
            url="quarterly_stacked_consumption_generation"
            graphic_type="1"
            :labels="[]"
          />
        </div>
        <div class="col-12 col-md-6">
          <line-chart
            title="Medida de frequência"
            url="minutely_frequency"
            graphic_type="1"
          />
        </div>
        <div class="col-12 col-md-6">
          <line-chart
            title="Medida de tensão"
            url="minutely_threephase_voltage"
            graphic_type="3"
          />
        </div>
        <div class="col-12 col-md-6">
          <line-chart
            title="Medida de corrente"
            url="minutely_threephase_current"
            graphic_type="3"
          />
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from 'components/charts/LineChart.vue'
import BarChart from 'components/charts/BarChart.vue'

export default {
  components: {
    LineChart,
    BarChart
  },

  data () {
    return {
      id: this.$route.params.transductor_id,
      transductor: {},
      loading: true
    }
  },

  beforeMount () {
    this.loading = true
    axios
      .get(`http://localhost:8001/energy_transductors/${this.id}`)
      .then((res) => {
        this.transductor = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    this.loading = false
  }

}
</script>

<style lang="scss" scoped>

</style>
