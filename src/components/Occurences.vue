<template>
  <q-scroll-area class="occ">
    <p class="occ-title" v-if="occurrences.length > 0">
      Ocorrência{{occurrences.length > 1? 's': '' }} em andamento
    </p>
    <div class="alert" v-for="occ in occurrences" v-bind:key="occ.id + occ.transductor + occ.start_time">
      <transducer-alert :occurrence="occ" :serious="seriousOccurrences.includes(occ.originalType)" />
    </div>

      <p class="history">Outras ocorrências nas últimas 72h:</p>
      <occurences-list
        v-if="today.length > 0"
        :title="'HOJE'"
        :items="this.today"
        :type="'transducer'"
      />
      <q-separator spaced inset v-if="yesterday.length > 0"/>
      <occurences-list
        v-if="yesterday.length > 0"
        :title="'ONTEM'"
        :items="this.yesterday"
        :type="'transducer'"
      />
      <q-separator spaced inset v-if="beforeYesterday.length > 0"/>
      <occurences-list
        v-if="beforeYesterday.length > 0"
        :title="'ANTEONTEM'"
        :items="this.beforeYesterday"
        :type="'transducer'"
      />
      <p v-if="today.length === 0 && yesterday.length === 0 && beforeYesterday.length === 0" class="no-occ">
        Não houve ocorrências
      </p>
  </q-scroll-area>
</template>

<script>
import MASTER from '../services/masterApi/http-common'
import { separateInDays } from '../utils/transductorStatus'
import transducerAlert from './TransducerAlert'
import occurencesList from './OccurencesList'

export default {
  name: 'Occurences',
  components: {
    transducerAlert: transducerAlert,
    occurencesList: occurencesList
  },
  props: [
    'id'
  ],
  data () {
    return {
      today: [],
      yesterday: [],
      beforeYesterday: [],
      occurrences: [],
      seriousOccurrences: ['phase_drop', 'critical_tension']
    }
  },
  created () {
    MASTER.get('/occurences/?type=period&id=' + this.id)
      .then(async res => {
        await separateInDays({
          eventsArray: res.data.critical_tension,
          type: 'critical_tension',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        })
        await separateInDays({
          eventsArray: res.data.precarious_tension,
          type: 'precarious_tension',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        })
        await separateInDays({
          eventsArray: res.data.phase_drop,
          type: 'phase_drop',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        })
        await separateInDays({
          eventsArray: res.data.transductor_connection_fail,
          type: 'conection_fail',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        })
        await separateInDays({
          eventsArray: res.data.slave_connection_fail,
          type: 'conection_fail',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="scss" scoped>
.occ {
  // display: flex;
  // flex-direction: column;
  min-height: 100vh;

  background-color: #f5f5f5;
  padding: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
}

.occ-title {
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-align: center;
  color: $primary;
}

.card-content {
  padding: 10px;
}

.map-button {
  color: $primary;
}

.history {
  color: $primary;
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-align: center;
}

.no-occ {
  text-align: center;
}

.alert {
  margin-bottom: 50px;
}

</style>
