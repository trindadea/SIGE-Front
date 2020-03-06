<template>
  <div class="q-pa-md q-mx text-center text-grey-6 vertical-middle">
    <div>
      <span>
        <q-icon
          class="q-mx-2"
          name="insert_chart_outlined"
          size="8rem"
          color="grey-5"/>
        <h3>Nenhum dado selecionado!</h3>
      </span>
      <p>
        {{info}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'info'
  ]
}
</script>

<style>

</style>
