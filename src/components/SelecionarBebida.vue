<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Bebidas">
    <div class="bg-white q-pt-md" style="min-width: 450px; position: absolute; border-radius: 15px;">
      <div class="row justify-between q-pb-md q-px-md">
        <div class="text-primary text-h5 column items-center q-mb-sm">Bebidas</div>
        <q-space/>
        <q-btn dense round flat icon="close" v-close-popup/>
      </div>
      <q-separator/>
      <div class="scroll q-mb-xl q-pt-md q-px-md" style="min-height: 450px; max-height: 450px;">
        <div v-for="bebida in bebidas" :key="bebida.id" class="q-my-md q-px-sm">
          <div :class="bebida.selecionado ? bebidaStyleSelecionado : bebidaStyleDefault">
            <div class="row items-center">
              <q-checkbox @input="onSelecionar(bebida)" v-model="bebida.selecionado" :label="bebida.nome"/>
              <span class="q-ml-sm"> - R$:{{bebida.preco}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-white full-width q-pa-md justify-end" style="position: absolute; bottom: 0; right: 0; border-top-style: solid; border-color: rgba(0,0,0,0.23); border-width: 1px">
        <q-btn flat label="Confirmar" no-caps color="primary" @click="confirmar"/>
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
      teste: false,
      bebidas: [],
      bebidaStyleSelecionado: 'row items-center text-white q-pl-sm full-width opcao-list shadow-2 bg-primary',
      bebidaStyleDefault: 'row items-center text-black q-pl-sm full-width opcao-list shadow-2 bg-white'
    }
  },
  computed: {
    ...mapState('Pedido', ['bebidasOptions'])
  },
  methods: {
    abrir: function () {
      this.$refs.Bebidas.show()
    },
    onShow: function () {
      this.bebidas = cloneDeep(this.bebidasOptions)
    },
    onSelecionar: function (bebida) {
      if (bebida.selecionado) {
        bebida.qtd++
      } else {
        bebida.qtd--
      }
    },
    confirmar: function () {
      this.$emit('retorno', this.bebidas.filter((bebida) => { return bebida.selecionado }))
      this.$refs.Bebidas.hide()
    }
  }
}
</script>

<style>
  .opcao-list{
    padding: 5px;
    border-radius: 25px;
  }
</style>
