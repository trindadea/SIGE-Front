<template>
  <div class="row justify-center q-py-lg">
    <div class="col-8 q-mx-lg">
      <q-form>
        <q-input
          filled
          type = "number"
          v-model="name"
          label="Serial Number"
          hint="type the transductor serial number"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor serial number']"
        />
        <q-input
          filled
          type = "number"
          v-model="name"
          label="IP address"
          hint="type the transductor ip address"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor ip address']"
        />
        <q-input
          filled
          v-model="name"
          label="Location"
          hint="type the transductor location"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor location']"
        />
        <q-input
          filled
          type = "number"
          v-model="name"
          label="Latitude"
          hint="type the transductor Latitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Latitude']"
        />
        <q-input
          filled
          type = "number"
          v-model="name"
          label="Longitude"
          hint="type the transductor Longitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Longitude']"
        />
        <q-toggle v-model="active" label="Active" />
      </q-form>
      <div class="row justify-center">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: true,
      framework: {
        components: [
          'QForm'
        ]
      }
    }
  }
}
</script>

<style>
</style>
