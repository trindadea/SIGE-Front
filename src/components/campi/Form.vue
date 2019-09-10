<template>
    <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @validation-success="send">
        <h3 class="text-secondary">
          Novo servidor
        </h3>
        <span
          :class="'text-capitalize text- text-' + messageType"
          v-if="message !== ''">
          {{ message }}
        </span>
        <q-input
          outlined
          name="slaveIp"
          v-model="slaveIp"
          label="Endereço do servidor"
          mask="###.###.###.###"
          :rules="[ val => val.length === 15 || 'Esse campo deve conter um endereço ip válido' ]"/>
        <q-input
          outlined
          name="location"
          v-model="location"
          label="Local do servidor"
          :rules="[ val =>  val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-toggle
          v-model="slaveStatus"
          :label="'Status do servidor: ' + (slaveStatus ? 'Ativo' : 'Inativo')"
          color="primary"/>

        <q-btn
          size="1rem"
          label="Enviar"
          color="primary"
          type="submit"
          :loading="loading"/>
        <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
