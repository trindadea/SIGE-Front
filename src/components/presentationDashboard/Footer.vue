<template>
  <span
    class="bg-grey-1 text-grey-9"
    bordered
  >
    <!-- <section class="q-py-lg container-header">
      <div class="row justify-between" id="about">
        <div class="col items-center">
          <p class="text-h6">
            O Sistema de Monitoramento de Insumos da Universidade de Brasília (SMI-UnB),
            é um aplicativo da Web desenvolvido para auxiliar no monitoramento
            e gerenciamento do consumo e distribuição de energia da Universidade de Brasília.
          </p>
          <p class="text-h6">
            Os objetivos do projeto são: monitorar, coletar e exibir dados
            de cada fonte de alimentação do campus, permitindo uma compreensão
            muito melhor dos padrões de uso e qualidade da energia recebidos da
            estação de distribuição.
          </p>
        </div>
        <div class="col items-center">
          <q-img
            src="statics/transparents/proj_trans_l.png"
            :contain="true"
            style="max-height: 400px; max-width: 100%"
          />
        </div>
      </div>

      <hr class="text-grey-2"> -->
      <!-- <div class="">
        <h3 class="text-center">
          Parceiros
        </h3>
      </div> -->

      <div class="q-pt-lg row q-mb-lg" id="partners">
        <div
          v-for="partner in partners" :key="partner.id"
          class="col">
          <q-img
            contain
            :src="partner"
            style="max-height: 300px; max-width: 100%"
          />
        </div>
      </div>
    <!-- </section> -->

    <!-- <div class="text-center bg-grey-10 text-grey-1" id="links">
      <q-btn
        round
        flat
        outline
        v-for="link in links"
        :key="link.id"
        :href="link.link"
        :icon="link.icon"
        class="q-mx-md"
      />
      <p>
        Desenvolvido por:
          <a href="https://lappis.rocks">
            LAPPIS
          </a>
      </p>
    </div> -->
  </span>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { icon: 'fab fa-gitlab', link: 'https://gitlab.com/lappis-unb/SMI-UnB/' },
        { icon: 'fab fa-github', link: 'https://github.com/lappis-unb/SMI-UnB/' }
      ],

      partners: [
        'https://www.infoescola.com/wp-content/uploads/2016/02/unb.png',
        'statics/ceb_partner.jpg',
        'statics/transparents/logo_PED_vertical_com_sigla.png'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.unb-green {
  background-color: rgb(2, 105, 47);
}

// section {
//   padding-top: 3rem;
//   padding-bottom: 3rem;
// }

// #links {
//   p {
//     margin-bottom: 0;
//     a {
//       text-decoration: none;
//       color: inherit;
//     }
//   }
// }

</style>
