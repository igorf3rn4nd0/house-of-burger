<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Lanches">
    <q-card>
      <q-card-section>
        <div class="row justify-end">
          <q-btn dense round flat icon="close" v-close-popup/>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-primary text-h5 column items-center q-mb-sm">Lanches</div>
      </q-card-section>

      <q-card-section style="min-height: 50vh; min-width: 350px" class="scroll">
        <div v-for="lanche in lanches" :key="lanche.id" class="q-my-md">
          <div :class="lanche.selecionado ? lancheStyleSelecionado : lancheStyleDefault">
            <div class="col-11">
              <div class="row items-center">
                <q-checkbox @input="onSelecionar(lanche)" v-model="lanche.selecionado" :label="lanche.nome"/>
                <span class="q-ml-sm"> - R$:{{precoLanche(lanche)}}</span>
              </div>
            </div>
            <div class="col-1">
              <q-btn v-if="lanche.selecionado" @click="lanche.editar = !lanche.editar" flat dense size="10px" class="q-mr-sm" round icon="mdi-pencil"></q-btn>
            </div>
          </div>
          <q-slide-transition>
            <div v-if="lanche.editar && lanche.selecionado" >
              <q-list bordered separator class="q-mx-lg rounded-borders">
                <div>
                  <q-item>
                    <q-item-section>
                   <span class="text-secondary q-ml-sm">
                    Ingredientes
                  </span>
                    </q-item-section>
                    <q-separator/>
                  </q-item>
                  <q-item v-for="ingrediente in lanche.ingredientes" :key="ingrediente.id">
                    <q-item-section>
                      <q-checkbox v-model="ingrediente.selecionado" :label="ingrediente.nome" />
                    </q-item-section>
                  </q-item>
                  <q-separator/>
                  <q-item>
                    <q-item-section>
                    <span class="text-secondary q-ml-sm">
                    Adicionais
                  </span>
                    </q-item-section>
                    <q-separator/>
                  </q-item>
                  <q-item v-for="adicional in lanche.adicionais" :key="adicional.id">
                    <q-item-section>
                      <q-checkbox
                        @input="onSelecionarAdicional(lanche, adicional)"
                        v-model="adicional.selecionado"
                        :label="adicional.quantitativo ? adicional.qtd + ' - ' + adicional.nome : adicional.nome" />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <div class="row reverse">
                        <q-btn dense @click="selecionarAdicional(lanche)" color="primary" round icon="mdi-plus"></q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </div>
          </q-slide-transition>
        </div>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn flat label="Confirmar" no-caps color="primary" @click="confirmar"/>
      </q-card-actions>
    </q-card>
    <selecionar-adicionais ref="Adicionais" @retorno="incluirAdicional"></selecionar-adicionais>
  </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import SelecionarAdicionais from './SelecionarAdicionais'
export default {
  components: { SelecionarAdicionais },
  // name: 'ComponentName',
  data () {
    return {
      teste: false,
      lanches: [],
      lancheStyleSelecionado: 'row items-center text-white q-pl-sm full-width opcao-list shadow-2 bg-primary',
      lancheStyleDefault: 'row items-center text-black q-pl-sm full-width opcao-list shadow-2 bg-white',
      lancheEmEdicao: {}
    }
  },
  computed: {
    ...mapState('Pedido', ['lanchesOptions'])
  },
  methods: {
    abrir: function () {
      this.$refs.Lanches.show()
    },
    onShow: function () {
      console.log(this.lanchesOptions)
      this.lanches = cloneDeep(this.lanchesOptions)
    },
    onSelecionar: function (lanche) {
      if (lanche.selecionado) {
        lanche.qtd++
      } else {
        lanche.qtd--
      }
    },
    onSelecionarAdicional: function (lanche, adicional) {
      if (!adicional.selecionado) {
        lanche.adicionais.splice(lanche.adicionais.findIndex((a) => { return a.id === adicional.id }), 1)
      }
    },
    confirmar: function () {
      this.$emit('retorno', this.lanches.filter((lanche) => { return lanche.selecionado }))
      this.$refs.Lanches.hide()
    },
    selecionarAdicional: function (lanche) {
      this.lancheEmEdicao = lanche
      this.$refs.Adicionais.abrir()
    },
    incluirAdicional: function (adicionaisSelecionados) {
      adicionaisSelecionados.forEach((adicionalSelecionado) => {
        if (this.adicionalJaAdicionado(adicionalSelecionado) === undefined) {
          this.lancheEmEdicao.adicionais.push(adicionalSelecionado)
        } else if (adicionalSelecionado.quantitativo) {
          let adicionalJaAdicionado = this.adicionalJaAdicionado(adicionalSelecionado)
          adicionalJaAdicionado.qtd += adicionalJaAdicionado.qtd
        }
      })
    },
    adicionalJaAdicionado: function (adicionalSelecionado) {
      return this.lancheEmEdicao.adicionais.find((adicionalAdicionado) => { return adicionalAdicionado.id === adicionalSelecionado.id })
    },
    precoLanche: function (lanche) {
      let retorno = lanche.preco
      lanche.adicionais.forEach((adicional) => {
        if (adicional.quantitativo) {
          retorno += (adicional.qtd * adicional.preco)
        } else {
          retorno += adicional.preco
        }
      })
      return retorno
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
