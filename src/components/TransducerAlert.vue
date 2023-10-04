<template>
  <div class="occurrence">
    <q-icon
      :class="{'img-light': !serious}"
      class="occurrence-img"
      :name="getIcon(this.serious)"
    />
    <q-card class="my-card" :class="{'card-light': !serious}">
      <q-card-section class="text-type" :class="{'text-type-light': !serious}">{{ occurrence.type }}</q-card-section>
      <div class="occurrence-content">
        <div class="caption" :class="{'caption-light': !serious}">{{occurrence.info}}</div>
        <div class="caption" :class="{'caption-light': !serious}">Desde {{occurrence.writtenStartTime}}</div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'TransducerAlert',
  data () {
    return {
      serious_icon: 'img:/statics/header_ocorrencia_critica_vertical.png',
      light_icon: 'img:/statics/header_ocorrencia_precaria_vertical.png'
    }
  },
  props: {
    /* eslint-disable */
    serious: {
      type: Boolean,
      default: true
    },
    occurrence: {
      type: Object
    }
    /* eslint-enable */
  },
  methods: {
    getIcon (serious) {
      if (serious) {
        return this.serious_icon
      } else {
        return this.light_icon
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.occurrence {
  text-align: center;
  background-color: #f5f5f5;
  // margin-top: 0;
  // margin-bottom: 5%;
}
.occurrence-img {
  color: #f5f5f5;
  text-align: center;
  width: 20%;
  height: auto;
  margin-bottom: -6.2%;
  z-index: 1;
}
.img-light {
  margin-bottom: -8.2%;
}
.occurrence-content {
  display: flex;
  justify-content: space-between;
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: right;
  color: #f5f5f5;
  padding-top: 2%;
}
.text-type {
  font-family: Roboto;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #f5f5f5;
  padding-bottom: 5%;
  padding-top: 6%;
  padding-left: 0;
  padding-right: 0;
}
.text-type-light {
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.87);
}
.caption {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: left;
  color: #f5f5f5;
}
.caption-light {
  font-family: Roboto;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
}
.my-card {
  width: 100%;
  background-color: #f13209;
  padding: 3%;
}
.card-light {
    background-color: #f1c809;
}
</style>
