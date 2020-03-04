<template>
  <div>
    <div class="row">
      <measurements-box :id="id"/>
      <active-box :id="id"/>
    </div>
    <occurences :id="id"/>
  </div>
</template>

<script>
import measurementsBox from '../components/transductor/measurementsBox'
import activeBox from '../components/transductor/activeBox'
import occurences from '../components/transductor/occurences'

export default {
  name: 'Transductor',
  components: {
    measurementsBox: measurementsBox,
    activeBox: activeBox,
    occurences: occurences
  },
  data () {
    return {
      id: this.$router.currentRoute.params.id
    }
  }
}
</script>

<style lang="scss" scopped>
// .retangle {
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
//   background-color: #ffffff;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 10px;
// }

// .readings th {
//   text-align: start;
//   font-family: Roboto;
//   font-size: 12px;
//   font-weight: 500;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.33;
//   letter-spacing: 2px;
//   color: #00417e;
// }

// .readings {
//   width: 100%;
//   text-align: start;
// }

// .readings td {
//   font-family: Roboto;
//   font-size: 14px;
//   line-height: 1.43;
//   letter-spacing: 0.25px;
//   color: rgba(0, 0, 0, 0.87);
// }

// .table-title {
//   font-family: Roboto;
//   font-size: 24px;
//   font-weight: 300;
//   font-stretch: normal;
//   font-style: italic;
//   line-height: normal;
//   letter-spacing: normal;
//   text-align: center;
//   color: #00417e;
// }

// .occ {
//   background-color: #f5f5f5;
//   min-height: 100vw;
//   width: 350px;
//   padding: 10px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);

// }

// .occ-title {
//   font-family: Roboto;
//   font-size: 16px;
//   line-height: 1.5;
//   letter-spacing: 0.15px;
//   text-align: center;
//   color: #00417e;
// }

// .card-content {
//   padding: 10px;
// }

// .map-button {
//   color: #00417e;
// }

// .history {
//   margin-top: 3%;
//   font-family: Roboto;
//   font-size: 2.7vh;
//   line-height: 1.5;
//   letter-spacing: 0.15px;
//   text-align: center;
//   color: rgba(0, 0, 0, 0.87);
// }

</style>
