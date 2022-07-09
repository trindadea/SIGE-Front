<template>
  <div class="lds-ripple" :style="cssVars">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',

  data () {
    return {
    }
  },

  props: {
    size: {
      type: String,
      required: false,
      default: 'regular'
    },
    color: {
      type: String,
      required: false,
      default: '#00417e'
    }
  },

  computed: {
    cssVars () {
      const sizeMap = {
        small: 0.5,
        regular: 1,
        big: 2.5
      }
      return {
        '--size': sizeMap[this.size],
        '--color': this.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lds-ripple {
  display: inline-block;
  position: relative;
  width: calc(var(--size) * 160px);
  height: calc(var(--size) * 160px);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid var(--color);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: calc(var(--size) * 72px);
    left: calc(var(--size) * 72px);
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: calc(var(--size) * 144px);
    height: calc(var(--size) * 144px);
    opacity: 0;
  }
}
</style>
