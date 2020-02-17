<template>
<div class="row q-pb-md">
  <q-card
    flat
    class="col card-base card-bg"
  >
    <q-card-section
      class="q-py-xs card-title text-center"
    >
      Últimas 72h
    </q-card-section>
    <q-card-section
      class="row q-col-gutter-none"
    >
      <div class="col text-center">
        <p class="counter">
          666
          <q-icon name="cached" color="red"/>
          <br/>
          <small class="text-center text-grey">Graves</small>
        </p>
      </div>
      <div class="col text-center">
        <p class="counter">
          666
          <q-icon name="cached" color="yellow"/>
          <br/>
          <small class="text-center text-grey">Leves</small>
        </p>
      </div>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  small {
    font-size: 16px;
    font-weight: normal;
  }

  .counter {
    font-size: 42px;
    font-weight: bold;
    line-height: 3px;
  }

</style>
