<template>
  <div class="q-py-lg bg-white">
  <!-- <div class="container q-py-lg bg-white"> -->
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

    <section
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeIn"
    >
      <div class="row">
        <div class="col-12 col-md-6">
          <line-chart
            title="Corrente"
            url="minutely_threephase_current"
            graphic_type="3"
            unit="A"
            decimals="2"
            :id="id"
          />
        </div>
        <div class="col-12 col-md-6">
          <line-chart
            title="Potência reativa"
            url="minutely_reactive_power"
            graphic_type="3"
            unit="kW"
            :id="id"
          />
        </div>
        <div class="col-12 col-md-6">
          <line-chart
            title="Tensão"
            url="minutely_threephase_voltage"
            graphic_type="3"
            unit="V"
            :id="id"
          />
        </div>
        <div class="col-12 col-md-6">
            <line-chart
              title="Potência ativa"
              url="minutely_active_power"
              graphic_type="3"
              unit="kW"
              decimals="2"
              :id="id"
            />
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from 'components/charts/LineChartPresentation.vue'
// import BarChart from 'components/charts/BarChartPresentation.vue'

export default {
  components: {
    // BarChart,
    LineChart
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
    console.log(this.id)
    axios
      .get(`http://192.168.100.229:8001/energy_transductors/${this.id}`)
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
