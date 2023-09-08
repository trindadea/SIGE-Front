<template>
  <div class="containerFilter">
    <div class="adjust">
      <div class="filter">
        <q-select
          v-model="campusModel"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Campus"
          :options="optionsCampus"
          @filter="filterCampus"
          class="col-4 elem select"
          @input="handleCampusChange"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="optionsModel"
          use-input
          map-options
          emit-value
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Unidade Consumidora"
          :options="optionsGroup"
          @filter="filterGroup"
          class="col-4 elem select"
          @input="handleGroupChange"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          v-model="startDate"
          :mask="mask"
          label="Período"
          class="elem input"
          :error="errorStartDate"
          @input="handleStartDateChange"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer calendar">
              <q-popup-proxy
                ref="monthPicker"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  minimal
                  mask="MM/YYYY"
                  emit-immediately
                  default-view="Years"
                  v-model="startDate"
                  @input="verifyClearInput"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-btn
          class="apply_button"
          size="1rem"
          label="Aplicar"
          type="button"
          @click="applyFilter"
          color="primary"
        />
      </div>
    </div>

    <div class="adjust-toggle">
      <q-toggle @input="handleSwitch" v-model="adjustValue" />
      <a class="subtitle" id="subtitle">Ajustar para datas de faturamento</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CampiService from "../../services/CampiService";
import report from "../../services/api/report";
import moment from "moment";

export default {
  name: "ReportFilter",
  data() {
    return {
      periodicity: "monthly",
      campusModel: 1,
      optionsCampus: [],
      optionsModel: null,
      optionsGroup: [],
      startDate: "06/2023", // Valor padrão por enquanto(unico mes com dados)
      mask: "##/####",
      adjustValue: false,
    };
  },
  async created() {
    const campiService = new CampiService();
    this.optionsCampus = await campiService.getAllCampiInfo();
    this.applyFilter();
    this.getGroups();
  },
  computed: {
    ...mapGetters("totalCostStore", ["errorStartDate", "getUrl"]),
  },
  methods: {
    ...mapActions("totalCostStore", [
      "changePeriodicity",
      "changeStartDate",
      "filterByCampus",
      "filterByGroup",
      "clearStartDate",
      "updateChart",
    ]),
    async applyFilter() {
      await this.getReports();
      await this.getUfer();
    },
    async getReports() {
      try {
        const response = await report.getReports(
          this.formatDate(this.startDate),
          this.campusModel,
          this.optionsModel
        );
        this.response = response;
        this.$emit("data-updated", this.response);
      } catch (error) {
        console.error("Failed to get reports:", error);
        this.response = {};
        this.$emit("data-updated", this.response);
      }
    },
    async getUfer() {
      try {
        const response = await report.getUfer(
          this.formatDate(this.startDate),
          this.campusModel,
          this.optionsModel
        );
        this.response = response;
        this.$emit("ufer-updated", this.response);
      } catch (error) {
        console.error("Failed to get ufer:", error);
        this.response = {};
        this.$emit("ufer-updated", this.response);
      }
    },
    async filterOptions(val, update) {
      const needle = val.toLowerCase();
      update(() => {
        this.optionsCampus = this.optionsCampus.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCampus(val, update) {
      this.filterOptions(val, update);
    },
    filterGroup(val, update) {
      this.filterOptions(val, update);
    },
    async getGroups() {
      const selectedCampus = this.optionsCampus.find(
        (campus) => campus.id === this.campusModel
      );
      if (selectedCampus) {
        const updatedGroups = selectedCampus.groups_related.filter(
          (group, index, self) => {
            return index === self.findIndex((g) => g.name === group.name);
          }
        );
        this.optionsModel = null;
        this.optionsGroup = updatedGroups;
      }
    },
    formatDate(date) {
      return moment(date, "MM/YYYY").startOf("month").format("YYYY-MM-DD");
    },
    handleCampusChange() {
      this.getGroups();
      this.filterByCampus(this.campusModel);
    },
    handleGroupChange() {
      this.filterByGroup(this.optionsModel);
    },
    handlePeriodicityChange() {
      this.changePeriodicity(this.periodicity);
    },
    handleStartDateChange() {
      if (!this.startDate) {
        this.clearStartDate();
        this.getChart();
      } else {
        if (moment(this.startDate, "MM-YYYY").isValid()) {
          this.changeStartDate(this.startDate);
          this.getChart();
        }
      }
    },
    handleSwitch() {
      if (
        document.getElementById("subtitle").innerHTML ==
        "Ajustar para datas mensais"
      ) {
        document.getElementById("subtitle").innerHTML =
          "Ajustar para datas de faturamento";
      } else {
        document.getElementById("subtitle").innerHTML =
          "Ajustar para datas mensais";
      }
    },
    verifyClearInput(val, reason) {
      if (reason === "month") {
        this.$refs.monthPicker.hide();
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
