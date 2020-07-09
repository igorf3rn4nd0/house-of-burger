<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Outros">
    <q-card>
      <q-card-section>
        <div class="row justify-end">
          <q-btn dense round flat icon="close" v-close-popup/>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-primary text-h5 column items-center q-mb-sm">Outros</div>
      </q-card-section>

      <q-card-section class="scroll">
        <q-scroll-area :style="$q.platform.is.mobile ? 'height: 60vh; width: 100%' : 'height: 60vh; width: 350px'">
          <div v-for="itemOutros in outros" :key="itemOutros.id" class="q-my-md q-px-sm">
            <div :class="itemOutros.selecionado ? itemOutrosStyleSelecionado : itemOutrosStyleDefault">
              <div class="row items-center">
                <q-checkbox @input="onSelecionar(itemOutros)" v-model="itemOutros.selecionado" :label="itemOutros.nome"/>
                <span class="q-ml-sm"> - R$:{{itemOutros.preco}}</span>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn flat label="Confirmar" no-caps color="primary" @click="confirmar"/>
      </q-card-actions>
    </q-card>
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
      outros: [],
      itemOutrosStyleSelecionado: 'row items-center text-white q-pl-sm full-width opcao-list shadow-2 bg-primary',
      itemOutrosStyleDefault: 'row items-center text-black q-pl-sm full-width opcao-list shadow-2 bg-white'
    }
  },
  computed: {
    ...mapState('Pedido', ['outrosOptions'])
  },
  methods: {
    abrir: function () {
      this.$refs.Outros.show()
    },
    onShow: function () {
      this.outros = cloneDeep(this.outrosOptions)
    },
    onSelecionar: function (itemOutros) {
      if (itemOutros.selecionado) {
        itemOutros.qtd++
      } else {
        itemOutros.qtd--
      }
    },
    confirmar: function () {
      this.$emit('retorno', this.outros.filter((outroItem) => { return outroItem.selecionado }))
      this.$refs.Outros.hide()
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
