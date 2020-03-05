<template>
  <div class="q-mt-lg">
    <div v-if="title" class="ListTitle h1">{{title}}</div>
    <div v-if="items">
      <div class="content q-mb-xs">
        <q-list>
          <div v-for="item in items" v-bind:key="item.id + item.transductor + item.start_time">
            <q-item>
              <q-item-section>
                <q-item-label class="text">{{item.type}}</q-item-label>
                <q-item-label caption class="caption">{{item.info}}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption class="caption-top">{{item.writtenStartTime}} - {{item.writtenEndTime}}</q-item-label>
              </q-item-section>

            </q-item>
          <div class="clear"></div>
          </div>
        </q-list>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SimpleList',
  props: {
    title: {
      type: String
    },
    /* eslint-disable */
    items: {
      type: Array,
      default: []
    },
    /* eslint-enable */
    type: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      seriousOccurrences: ['phase_drop', 'critical_tension'],
      seriousIcon: 'img:statics/ic_ocorrencia_critica_color.svg',
      lightIcon: 'img:statics/ic_ocorrencia_precaria_mono.svg'
    }
  },
  methods: {
    getIcon (type) {
      if (this.seriousOccurrences.includes(type)) {
        return this.seriousIcon
      } else {
        return this.lightIcon
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ListTitle {
  width: 141px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 2px;
  color: $primary;
}

.text {
  width: 152px;
  height: 24px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
}

.caption {
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.6);
}
.caption-top {
  font-family: Roboto;
  font-size: 1.8vh;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: right;
  color: rgba(0, 0, 0, 0.87);
}

.clear{width: 100%; clear: both; height: 0px; line-height:0px;}
</style>
