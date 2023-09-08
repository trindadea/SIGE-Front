<template>
  <div class="q-pa-md">
    <ReportFilter
      ref="ReportFilter"
      @data-updated="getReportData"
      @ufer-updated="getPowerFactorData"
    />
    <q-table
      :data="data"
      :columns="reportColumns"
      row-key="name"
      title="Relatório por período"
      no-data-label="Nenhum dado encontrado"
      :hide-bottom="data.length > 0"
    >
    </q-table>
    <q-table
      :data="powerFactorData"
      :columns="powerFactorColumns"
      row-key="name"
      title="Fator de potência fora da faixa permitida pela norma"
      no-data-label="Nenhum dado encontrado"
    >
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ReportFilter from "../components/ReportFilter/ReportFilter.vue";

export default {
  name: "Report",
  components: {
    ReportFilter,
  },
  computed: {
    ...mapGetters({
      // totalCostChart: 'totalCostStore/totalCostChart'
    }),
  },
  methods: {
    ...mapActions({
      changePage: "userStore/changePage",
    }),
    clickItem(row) {
      this.$router.push("transductor/" + row.serial_number);
    },
    getReportData(value) {
      this.updatedReportData = value;
      this.createReportChart();
    },
    getPowerFactorData(value) {
      this.updatedPowerFactorData = value;
      this.createPowerFactorChart();
    },
    createReportChart() {
      const response = this.updatedReportData;

      try {
        const {
          consumption_off_peak_time,
          consumption_peak_time,
          generated_energy_off_peak_time,
          generated_energy_peak_time,
          tariff_peak,
          tariff_off_peak,
          total_consumption_off_peak_time = tariff_off_peak *
            consumption_off_peak_time,
        } = response;

        const total_consumption_peak_time = tariff_peak * consumption_peak_time;
        const total_generated_energy_off_peak_time = undefined;
        const total_generated_energy_peak_time = undefined;
        const total_valuekwh =
          consumption_off_peak_time +
          consumption_peak_time -
          (generated_energy_off_peak_time + generated_energy_peak_time);
        const total_coast =
          total_consumption_off_peak_time + total_consumption_peak_time;

        this.data = [
          {
            name: "Consumo (Ponta)",
            valor_kwh: Intl.NumberFormat("pt-BR").format(consumption_peak_time),
            tarifa: Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(tariff_peak),
            total: Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total_consumption_peak_time),
          },
          {
            name: "Consumo (Fora de Ponta)",
            valor_kwh: Intl.NumberFormat("pt-BR").format(
              consumption_off_peak_time
            ),
            tarifa: Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(tariff_off_peak),

            total: Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total_consumption_off_peak_time),
          },
          {
            name: "Energia Gerada (Ponta)",
            valor_kwh: Intl.NumberFormat("pt-BR").format(
              generated_energy_peak_time
            ),
            tarifa: undefined,
            total: total_generated_energy_peak_time,
          },
          {
            name: "Energia Gerada (Fora de Ponta)",
            valor_kwh: Intl.NumberFormat("pt-BR").format(
              generated_energy_off_peak_time
            ),
            tarifa: undefined,
            total: total_generated_energy_off_peak_time,
          },
          {
            name: "Total",
            valor_kwh:
              Intl.NumberFormat("pt-BR").format(total_valuekwh) + " kWh",
            tarifa: undefined,
            total: Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total_coast),
          },
        ];
      } catch (error) {
        console.error("Error creating reports chart:", error);
        this.data = [];
      }
    },
    createPowerFactorChart() {
      const response = this.updatedPowerFactorData;

      try {
        this.powerFactorData = response.map((item) => ({
          medidor: item.transductor_name,
          faseA: Intl.NumberFormat("pt-BR").format(item.phase_a * 100),
          faseB: Intl.NumberFormat("pt-BR").format(item.phase_b * 100),
          faseC: Intl.NumberFormat("pt-BR").format(item.phase_c * 100),
        }));
      } catch (error) {
        console.error("Error creating power factor chart:", error);
        this.powerFactorData = [];
      }
    },
  },
  created() {
    this.changePage("Relatório");
  },
  data() {
    return {
      pagination: {
        page: 1,
        sortBy: "desc",
        descending: false,
        rowsPerPage: 0,
      },
      reportColumns: [
        {
          name: "name",
          required: true,
          label: "Item",
          align: "left",
          field: "name",
          format: (val) => `${val}`,
        },
        { name: "tarifa", label: "Tarifa (R$ / kWh)", field: "tarifa" },
        {
          name: "valor_kwh",
          align: "right",
          label: "Valor (kWh)",
          field: "valor_kwh",
        },
        { name: "total", label: "Total (R$)", field: "total" },
      ],
      data: [],
      powerFactorColumns: [
        { name: "medidor", align: "left", label: "Medidor", field: "medidor" },
        { name: "faseA", label: "Fase A (%)", field: "faseA", sortable: true },
        { name: "faseB", label: "Fase B (%)", field: "faseB", sortable: true },
        { name: "faseC", label: "Fase C (%)", field: "faseC", sortable: true },
      ],
      powerFactorData: [],
    };
  },
};
</script>

<style>
.q-table__top,
thead tr th {
  background-color: #00417e !important;
  color: #fff;
  font-size: 1em !important;
}

thead tr.meter-header-group {
  height: 1em;
}
thead tr.meter-header-group th {
  border: none;
  padding: 0 0 4px;
}

.meter-header-group th.meter-table-header-group-cell-grouped {
  border-bottom: solid 1px #527ea7;
}
</style>
