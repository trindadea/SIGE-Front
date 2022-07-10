<template>
 <div class='apex-container' :style="cssProps">
    <slot />
    <div v-if="loadingStatus" class='chart-sppiner'><spinner size="big" ></spinner></div>
 </div>
</template>

<script>
import Spinner from '../loader/Spinner.vue'
export default {
  name: 'ChartContainer',
  components: {
    Spinner
  },
  data () {
    return {
    }
  },

  props: {
    loadingStatus: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    cssProps () {
      const opacity = this.loadingStatus ? 0.4 : 1
      return {
        '--opacity': opacity
      }
    }
  }
}

</script>

<style lang="scss" >
.apex-container {
  position: relative;
  min-height: 500px;
  &:first-child {
    opacity: var(--opacity);
  }
}
.chart-sppiner {
  background: transparent;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
