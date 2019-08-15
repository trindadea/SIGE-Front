<template>
  <q-page>
    <section
      id="summary-status"
      class="q-py-md">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Resumo do sistema
      </h4>
      <q-separator/>
      <div
        id="cards"
        class="row">
        <d-status-card
          class="col-sm-6 col-md-3"
          :maxValue="20"
          :value="15"
          title="Transdutores"/>
        <!-- <q-banner
          rounded
          class=""
          v-for="item in items"
          :key="item.id">
          {{ item }}
        </q-banner> -->
      </div>
    </section>
    <section id="transductor-status">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Estado dos transdutores
      </h4>
      <q-separator/>
      <div>

      </div>
    </section>
    <section id="slave-status">
      <h4 class="text-grey-7 q-my-xs q-mx-md">
        Estado dos servidores escravos
      </h4>
      <q-separator/>
      <div>

      </div>
    </section>
    <!-- <section id="database-status">
      <div>

      </div>
    </section> -->
  </q-page>
</template>

<script>
import DashboardSummaryStatusCard from 'components/dashboard/DashboardSummaryStatusCard.vue'

export default {
  components: {
    'd-status-card': DashboardSummaryStatusCard
  }

}
</script>

<style>

</style>
