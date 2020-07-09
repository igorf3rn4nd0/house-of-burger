<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Cliente">
    <q-card :style="$q.platform.is.desktop ? 'width: 700px; max-width: 80vw; border-radius: 15px' : 'position:relative; border-radius: 15px'">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-primary text-h5 column items-start q-pl-sm">Cliente</div>
          <q-space/>
          <q-btn dense round flat icon="close" color="primary" v-close-popup/>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-md q-mb-xl">
          <div class="row q-mt-md">
            <q-input class="full-width" outlined v-model="cliente.nome" label="Nome"/>
          </div>
          <div class="row q-mt-sm">
            <div :class="$q.platform.is.desktop ? 'col-8 q-pr-sm' : 'full-width q-mb-sm'">
              <q-input class="full-width" outlined v-model="endereco.rua" label="Rua"/>
            </div>
            <div :class="$q.platform.is.desktop ? 'col-4' : 'full-width'">
              <q-input class="full-width" type="number" outlined v-model="endereco.numero" label="Número"/>
            </div>
          </div>
          <div class="row q-mt-sm">
            <div :class="$q.platform.is.desktop ? 'col-8 q-pr-sm' : 'full-width'">
              <q-input class="full-width" outlined v-model="endereco.bairro" label="Bairro"/>
            </div>
          </div>
          <div class="row q-mt-sm">
            <div :class="$q.platform.is.desktop ? 'col-6' : 'full-width'">
              <q-input mask="(##) ##### - ####" class="full-width" outlined v-model="cliente.telefone" label="Telefone"/>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="col">
      </q-card-section>

      <q-card-actions style="position: absolute; bottom: 0; right: 0" align="right" class="bg-white text-teal q-pa-md">
        <q-btn flat label="Salvar" icon="save" no-caps color="primary" @click="salvar"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      cliente: {},
      endereco: {}
    }
  },
  methods: {
    abrir: function () {
      this.$refs.Cliente.show()
    },
    onShow: function () {
      if (this.cliente.endereco) {
        this.endereco = this.cliente.endereco
      }
    },
    salvar: function () {
      //
    }
  }
}
</script>

<style>
</style>
