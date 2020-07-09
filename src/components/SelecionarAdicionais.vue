<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Adicionais" style="min-height: 450px; max-height: 450px">
    <div class="bg-white" style="position: absolute; border-radius: 15px;">
      <div class="row items-center justify-between q-pa-md">
        <div class="text-primary text-h5 column items-center">Adicionais</div>
        <q-space/>
        <q-btn dense round flat icon="close" color="primary" v-close-popup/>
      </div>
      <q-separator/>
      <div class="scroll" style="min-height: 450px; max-height: 450px; min-width: 400px; margin-bottom: 70px">
        <q-list class="q-mx-sm rounded-borders">
          <div class="q-mt-md" v-for="adicional in adicionais" :key="adicional.id">
            <div class="row items-center justify-between q-mb-sm">
              <div class="col-9">
                <q-item class="items-center">
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="adicional.selecionado"
                    />
                  </q-item-section>
                  <q-item-label>
                    <div v-if="adicional.selecionado && adicional.quantitativo">
                      {{adicional.qtd + ' - ' + adicional.nome}}
                    </div>
                    <div v-else>
                      {{adicional.nome}}
                    </div>
                    <q-item-label caption>
                      <span class="text-secondary">R$: {{adicional.preco * adicional.qtd}}</span>
                    </q-item-label>
                  </q-item-label>
                </q-item>
              </div>
              <div v-if="adicional.selecionado && adicional.quantitativo" class="col-3">
                <div class="row">
                  <q-btn :disable="adicional.qtd === 1" @click="adicional.qtd--" size="10px" round dense class="text-primary" icon="mdi-minus"></q-btn>
                  <q-btn @click="adicional.qtd++" size="10px" round class="text-primary q-ml-md" dense icon="mdi-plus"></q-btn>
                </div>
              </div>
            </div>
            <q-separator inset/>
          </div>
        </q-list>
      </div>
      <div class="row full-width q-pa-md justify-end" style="position: absolute; bottom: 0; right: 0; border-top-style: solid; border-color: rgba(0,0,0,0.23); border-width: 1px">
        <q-btn outline label="Incluir" no-caps color="primary" @click="incluir"/>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
export default {
  // name: 'ComponentName',
  data () {
    return {
      adicionais: []
    }
  },
  computed: {
    ...mapState('Pedido', ['ingredienteOptions'])
  },
  methods: {
    abrir: function () {
      this.$refs.Adicionais.show()
    },
    onShow: function () {
      this.adicionais = cloneDeep(this.ingredienteOptions)
    },
    incluir: function () {
      this.$emit('retorno', this.adicionais.filter((adicional) => { return adicional.selecionado }))
      this.$refs.Adicionais.hide()
    }
  }
}
</script>

<style>
</style>
