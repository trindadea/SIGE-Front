<template>
  <div class="retangle">
    <p v-if="hasMeasurements" class="table-title">Última leitura - {{lastReading}}.</p>
    <p v-if="!hasMeasurements" class="table-title">Não há leituras salvas</p>
    <table v-if="hasMeasurements" align="center" class="readings">
      <tr>
        <th>TENSÃO</th>
        <th>CORRENTE</th>
        <th>POTÊNCIA</th>
        <th>GERAÇÃO</th>
      </tr>
      <tr>
        <td>Fase A - {{tension.a}}V</td>
        <td>Fase A - {{current.a}}A</td>
        <td>Ativa - {{power.a}}W</td>
        <td>{{generation}}kW</td>
      </tr>
      <tr>
        <td>Fase B - {{tension.b}}V</td>
        <td>Fase B - {{current.b}}A</td>
        <td>Reativa - {{power.r}}kVAr</td>
      </tr>
      <tr>
        <td>Fase C - {{tension.c}}V</td>
        <td>Fase C - {{current.c}}A</td>
        <td>Total - {{power.t}}kVa</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { timePassed } from '../../utils/transductorStatus'
import MASTER from '../../services/masterApi/http-common'

export default {
  name: 'MeasurementsBox',
  props: [
    'id'
  ],
  data () {
    return {
      lastReading: '',
      tension: {},
      current: {},
      power: {},
      generation: 10,
      hasMeasurements: false
    }
  },
  async created () {
    console.log('id:', this.id)
    await MASTER
      .get('/realtime-measurements/?serial_number=' + this.id)
      .then(res => {
        this.tension = {
          a: Math.round(res.data[0].voltage_a),
          b: Math.round(res.data[0].voltage_b),
          c: Math.round(res.data[0].voltage_c)
        }
        this.current = {
          a: Math.round(res.data[0].current_a),
          b: Math.round(res.data[0].current_b),
          c: Math.round(res.data[0].current_c)
        }
        this.power = {
          a: Math.round(res.data[0].total_active_power),
          r: Math.round(res.data[0].total_reactive_power),
          t: Math.round(res.data[0].total_power_factor)
        }
        this.lastReading = this.getTime(res.data.collection_time)
        this.hasMeasurements = true
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getTime (d) {
      let ans = timePassed(d)
      if (ans !== 'agora') {
        ans = 'há ' + ans
      }
      return ans
    }
  }
}
</script>
<style lang="scss" scoped>
.retangle {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.readings th {
  text-align: start;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 2px;
  color: $primary;
}

.readings {
  width: 100%;
  text-align: start;
}

.readings td {
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
}

.table-title {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: $primary;
}
</style>
