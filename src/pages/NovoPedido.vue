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
        <div class="row reverse q-mb-lg">
          <q-btn dense @click="selecionarLanche" color="primary" round icon="mdi-plus"></q-btn>
        </div>
        <div class="q-my-md" :style="$q.platform.is.desktop ? 'max-width: 400px; margin-left: 20px' : ''" v-for="lanche in lanches" :key="lanche.uid">
          <div class="row justify-between q-mb-sm">
            <div class="col-1">
              <span>{{lanche.qtd}}</span>
            </div>
            <div class="col-7">
              <span>{{lanche.nome}}</span>
              <q-badge class="q-ml-sm" v-if="lanche.customizado" color="primary">
                Customizado
              </q-badge>
            </div>
            <div class="col-3">
              <div class="row">
                <q-btn v-if="lanche.qtd === 1" @click="removerLanche(lanche)" size="10px" outline color="primary" round dense icon="close"></q-btn>
                <q-btn v-else @click="lanche.qtd--" size="10px" round dense outline class="text-primary" icon="mdi-minus"></q-btn>
                <q-btn @click="lanche.qtd++" size="10px" round outline class="text-primary q-ml-md" dense icon="mdi-plus"></q-btn>
              </div>
            </div>
          </div>
          <q-separator/>
        </div>
      </q-step>
      <q-step
        :name="2"
        title="Bebidas"
        icon="fas fa-beer"
        active-icon="fas fa-beer"
      >
        <div class="row reverse q-mb-lg">
          <q-btn dense @click="selecionarBebida" color="primary" round icon="mdi-plus"></q-btn>
        </div>
        <div class="q-my-md" :style="$q.platform.is.desktop ? 'max-width: 400px; margin-left: 20px' : ''" v-for="bebida in bebidas" :key="bebida.uid">
          <div class="row justify-between q-mb-sm">
            <div class="col-1">
              <span>{{bebida.qtd}}</span>
            </div>
            <div class="col-7">
              <span>{{bebida.nome}}</span>
            </div>
            <div class="col-3">
              <div class="row">
                <q-btn v-if="bebida.qtd === 1" @click="removerBebida(bebida)" size="10px" outline color="primary" round dense icon="close"></q-btn>
                <q-btn v-else @click="bebida.qtd--" size="10px" round dense outline class="text-primary" icon="mdi-minus"></q-btn>
                <q-btn @click="bebida.qtd++" size="10px" round outline class="text-primary q-ml-md" dense icon="mdi-plus"></q-btn>
              </div>
            </div>
          </div>
          <q-separator/>
        </div>
      </q-step>
      <q-step
        :name="3"
        title="Outros"
        icon="fas fa-bacon"
        active-icon="fas fa-bacon"
      >
        <div class="row reverse q-mb-lg">
          <q-btn dense @click="selecionarOutros" color="primary" round icon="mdi-plus"></q-btn>
        </div>
        <div class="q-my-md" :style="$q.platform.is.desktop ? 'max-width: 400px; margin-left: 20px' : ''" v-for="itemOutros in outros" :key="itemOutros.uid">
          <div class="row justify-between q-mb-sm">
            <div class="col-1">
              <span>{{itemOutros.qtd}}</span>
            </div>
            <div class="col-7">
              <span>{{itemOutros.nome}}</span>
            </div>
            <div class="col-3">
              <div class="row">
                <q-btn v-if="itemOutros.qtd === 1" @click="removerItemOutros(itemOutros)" size="10px" outline color="primary" round dense icon="close"></q-btn>
                <q-btn v-else @click="itemOutros.qtd--" size="10px" round dense outline class="text-primary" icon="mdi-minus"></q-btn>
                <q-btn @click="itemOutros.qtd++" size="10px" round outline class="text-primary q-ml-md" dense icon="mdi-plus"></q-btn>
              </div>
            </div>
          </div>
          <q-separator/>
        </div>
      </q-step>
      <q-step
        :name="4"
        title="Forma de Pagamento"
        icon="far fa-credit-card"
        active-icon="far fa-credit-card"
      >
        <div class="q-my-md column items-start" :style="$q.platform.is.desktop ? 'margin-left: 20px' : ''">
          <q-checkbox v-model="formaPagamento" label="Crédito" :val="1"/>
          <q-checkbox v-model="formaPagamento" label="Débito" :val="2"/>
          <q-checkbox v-model="formaPagamento" label="Dinheiro" :val="3"/>
          <q-slide-transition>
            <div class="q-ml-md" v-if="formaPagamento.find((v) => { return v === 3 })">
              <q-input
                outlined
                v-model="troco"
                label="Troco para:"
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <div class="row items-center justify-between">
            <div class="col-auto">
              <q-btn :disable="step === 1" color="primary" @click="$refs.stepper.previous()" no-caps label="Voltar" class="q-mr-sm" />
              <q-btn v-if="step < 4" @click="$refs.stepper.next()" color="primary" no-caps label="Próximo" />
              <q-btn v-else :disable="total === 0" color="primary" no-caps label="Concluir" />
            </div>
            <div class="col-auto">
              <div class="row items-center">
                <div class="text-h7 text-secondary">
                  Total:
                </div>
                <div class="text-h6 text-primary q-mx-sm">
                  {{total}}
                </div>
              </div>
            </div>
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <selecionar-lanche @retorno="addLanche" ref="SelecionarLancheDialog"></selecionar-lanche>
    <selecionar-bebida @retorno="addBebida" ref="SelecionarBebidaDialog"></selecionar-bebida>
    <selecionar-outros @retorno="addOutros" ref="SelecionarOutrosDialog"></selecionar-outros>
  </q-page>
</template>

<script>
import SelecionarLanche from '../components/SelecionarLanche'
import SelecionarBebida from '../components/SelecionarBebida'
import SelecionarOutros from '../components/SelecionarOutros'
import { uid } from 'quasar'
export default {
  components: { SelecionarLanche, SelecionarBebida, SelecionarOutros },
  // name: 'PageName',
  data () {
    return {
      step: 1,
      lanches: [],
      bebidas: [],
      outros: [],
      formaPagamento: [],
      troco: ''
    }
  },
  computed: {
    total: function () {
      let retorno = 0
      this.lanches.forEach((lanche) => {
        retorno += lanche.preco * lanche.qtd
        lanche.adicionais.forEach((adicional) => {
          if (adicional.quantitativo) {
            retorno += (adicional.qtd * adicional.preco) * lanche.qtd
          } else {
            retorno += adicional.preco * lanche.qtd
          }
        })
      })
      this.bebidas.forEach((bebida) => {
        retorno += bebida.preco * bebida.qtd
      })
      this.outros.forEach((itemOutros) => {
        retorno += itemOutros.preco * itemOutros.qtd
      })
      return retorno
    }
  },
  methods: {
    selecionarLanche: function () {
      this.$refs.SelecionarLancheDialog.abrir()
    },
    selecionarBebida: function () {
      this.$refs.SelecionarBebidaDialog.abrir()
    },
    selecionarOutros: function () {
      this.$refs.SelecionarOutrosDialog.abrir()
    },
    addLanche: function (lanchesSelecionados) {
      lanchesSelecionados.forEach((lancheSelecionado) => {
        console.log(lancheSelecionado)
        if (this.existemIngredientesDesmarcados(lancheSelecionado) || lancheSelecionado.adicionais.length > 0) {
          lancheSelecionado.customizado = true
        }
        if (this.lancheJaAdicionado(lancheSelecionado) === undefined || lancheSelecionado.customizado) {
          this.$set(lancheSelecionado, 'uid', uid())
          console.log('lancheSelecionado', lancheSelecionado)
          this.lanches.push(lancheSelecionado)
        } else {
          let lancheJaAdicionado = this.lancheJaAdicionado(lancheSelecionado)
          lancheJaAdicionado.qtd++
        }
      })
    },
    addBebida: function (bebidasSelecionados) {
      bebidasSelecionados.forEach((bebidaSelecionada) => {
        if (this.bebidaJaAdicionada(bebidaSelecionada) === undefined) {
          this.$set(bebidaSelecionada, 'uid', uid())
          this.bebidas.push(bebidaSelecionada)
        } else {
          let bebidaJaAdicionada = this.bebidaJaAdicionada(bebidaSelecionada)
          bebidaJaAdicionada.qtd++
        }
      })
    },
    addOutros: function (outrosSelecionados) {
      outrosSelecionados.forEach((itemOutrosSelecionado) => {
        if (this.itemOutrosJaSelecionado(itemOutrosSelecionado) === undefined) {
          this.$set(itemOutrosSelecionado, 'uid', uid())
          this.outros.push(itemOutrosSelecionado)
        } else {
          let itemOutrosJaSelecionado = this.bebidaJaAdicionada(itemOutrosSelecionado)
          itemOutrosJaSelecionado.qtd++
        }
      })
    },
    removerLanche: function (lanche) {
      this.lanches.splice(this.lanches.findIndex((l) => { return l.uid === lanche.uid }), 1)
    },
    removerBebida: function (bebida) {
      this.bebidas.splice(this.bebidas.findIndex((b) => { return b.uid === bebida.uid }), 1)
    },
    removerItemOutros: function (itemOutros) {
      this.outros.splice(this.outros.findIndex((i) => { return i.uid === itemOutros.uid }), 1)
    },
    lancheJaAdicionado: function (lancheSelecionado) {
      return this.lanches.find((lancheAdicionado) => { return lancheAdicionado.id === lancheSelecionado.id && !lancheAdicionado.customizado })
    },
    bebidaJaAdicionada: function (bebidaSelecionada) {
      return this.bebidas.find((bebidaAdicionada) => { return bebidaAdicionada.id === bebidaSelecionada.id })
    },
    itemOutrosJaSelecionado: function (itemOutrosSelecionado) {
      return this.outros.find((itemOutrosAdicionado) => { return itemOutrosAdicionado.id === itemOutrosSelecionado.id })
    },
    existemIngredientesDesmarcados: function (lanche) {
      let retorno = false
      lanche.ingredientes.forEach((ingrediente) => {
        if (!ingrediente.selecionado) {
          retorno = true
        }
      })
      return retorno
    }
  }
}
</script>

<style>
</style>
