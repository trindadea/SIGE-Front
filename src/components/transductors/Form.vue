<template>
  <div class="row justify-center q-py-lg">
    <div class="col-8 q-mx-lg">
      <q-form>
        <q-input
          filled
          type = "number"
          v-model="serial_number"
          label="Serial Number"
          hint="type the transductor serial number"
          lazy-rules
          :rules="[ val => val && val.length > 7 || 'Please type the transductor serial number']"
        />
        <q-input
          filled
          v-model="ip_address"
          label="IP address"
          hint="type the transductor ip address"
          lazy-rules
          :rules="[  val => val && val.match('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$') || 'Please type the transductor ip address']"
        />
        <q-input
          filled
          v-model="location"
          label="Location"
          hint="type the transductor location"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor location']"
        />
        <q-input
          filled
          type = "number"
          v-model="latitude"
          label="Latitude"
          hint="type the transductor Latitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Latitude']"
        />
        <q-input
          filled
          type = "number"
          v-model="longitude"
          label="Longitude"
          hint="type the transductor Longitude"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type the transductor Longitude']"
        />
        <q-toggle v-model="active" label="Active" />
      </q-form>
      <div class="row justify-center">
        <q-btn
          label="Create"
          type="submit"
          color="primary"
          @click="addTransductor()"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serial_number: '',
      ip_address: '',
      location: '',
      latitude: '',
      longitude: '',
      active: true,
      framework: {
        components: [
          'QForm'
        ]
      }
    }
  },
  methods: {
    addTransductor () {
      console.log(this.serial_number)
      console.log(this.ip_address)
      console.log(this.location)
      console.log(this.latitude)
      console.log(this.longitude)
      console.log(this.active)
    }
  }
}
</script>

<style>
</style>
