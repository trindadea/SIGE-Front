let VueApexCharts = {}

if (!process.env.SERVER) {
  console.log("Loading 'vue-apexcharts'...")
  VueApexCharts = require('vue-apexcharts')
}

export default VueApexCharts
