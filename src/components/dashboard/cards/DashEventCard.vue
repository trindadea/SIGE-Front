<template>
  <div>
    <q-card
      flat
      class="card-base"
      :class="isActive ? activeClass : 'card-inactive'">

      <q-card-section
        class="text-center card-title">
        <span v-if="isActive">
          <q-icon :name="`img:statics/icons/ic_ocorrencia_${icon}_badge.svg`"/>
          <!-- <span style="padding-left: -30px">3</span> -->
        </span> {{name}}
      </q-card-section>

      <q-card-section
        v-if="isActive">
        <p v-for="ev in eventsList" :key="ev.id">
          {{ev}}
        </p>
      </q-card-section>

      <q-card-section
        v-else
        class="absolute-center">
        <h6 class="text-center">
          Nenhum ponto
        </h6>
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DashEventCard',

  data () {
    return {
      isActive: this.eventsList.length !== 0
    }
  },

  props: {
    name: String,
    activeClass: String,
    eventsList: Array,
    icon: String
  }

}
</script>

<style lang="scss" scoped>
  .card-inactive {
    background-color: #00080f;
    border: 2px solid #001324;
    color: rgba(255, 255, 255, 0.2);
  }

  .card-active-critical {
    background-color: #3d0202;
    color: white;
  }

  .card-active-warning {
    background-color: #4d3e00;
    color: white;
  }
</style>
