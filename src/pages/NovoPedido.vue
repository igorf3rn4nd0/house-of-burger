<template>
  <q-page padding>
    <q-stepper
      v-model="step"
      header-nav
      :vertical="$q.platform.is.mobile"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Lanches"
        icon="mdi-hamburger"
        active-icon="mdi-hamburger"
      >
        <q-btn @click="addLanche" round icon="mdi-plus"></q-btn>
      </q-step>
      <q-step
        :name="2"
        title="Bebidas"
        icon="fas fa-beer"
        active-icon="fas fa-beer"
      >
      </q-step>
      <q-step
        :name="3"
        title="Forma de Pagamento"
        icon="far fa-credit-card"
        active-icon="far fa-credit-card"
      >
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn :disable="step == 1" color="primary" @click="$refs.stepper.previous()" no-caps label="Voltar" class="q-mr-sm" />
          <q-btn @click="$refs.stepper.next()" color="primary" no-caps :label="step === 4 ? 'Finalizar' : 'Próximo'" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <selecionar-lanche ref="SelecionarLancheDialog"></selecionar-lanche>
  </q-page>
</template>

<script>
import SelecionarLanche from '../components/SelecionarLanche'
export default {
  components: { SelecionarLanche },
  // name: 'PageName',
  data () {
    return {
      step: 1
    }
  },
  methods: {
    addLanche: function () {
      this.$refs.SelecionarLancheDialog.abrir()
    }
  }
}
</script>

<style>
</style>
