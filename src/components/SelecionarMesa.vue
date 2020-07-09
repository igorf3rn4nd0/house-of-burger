<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Mesas">
    <div class="bg-white" style="border-radius: 15px; position: relative">
      <div class="row items-center justify-between q-pa-md">
        <div class="text-primary text-h6 column items-center">Selecione uma Mesa</div>
        <q-space/>
        <q-btn dense round flat icon="close" v-close-popup/>
      </div>
      <div class="scroll q-mx-md" :style="$q.platform.is.mobile ? 'height: 50vh;' : 'min-height: 70vh; max-height: 70vh; min-width: 25vw;'">
        <div v-for="mesa in mesas" :key="mesa.id" class="q-my-md q-px-sm">
          <div @click="onSeleionarMesa(mesa)" :class="mesa.selecionada ? mesaStyleSelecionada : mesaStyleDefault">
            <div class="row items-center">
              <q-checkbox @input="desmarcarOutras(mesa)" v-model="mesa.selecionada" :label="mesa.numero"/>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-md q-pb-sm" style="position: absolute; right: 0; bottom: 0">
        <q-btn flat label="Selecionar" no-caps color="primary" @click="selecionar"/>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
export default {
  // name: 'ComponentName',
  data () {
    return {
      mesas: [],
      mesaStyleSelecionada: 'row items-center text-white q-pl-sm full-width opcao-list shadow-2 bg-primary',
      mesaStyleDefault: 'row items-center text-black q-pl-sm full-width opcao-list shadow-2 bg-white'
    }
  },
  computed: {
    ...mapState('Mesa', ['mesasOptions'])
  },
  methods: {
    ...mapActions('Mesa', ['setMesaSelecionada']),
    abrir: function () {
      this.$refs.Mesas.show()
    },
    onShow: function () {
      this.mesas = cloneDeep(this.mesasOptions)
    },
    onSeleionarMesa: function (mesa) {
      mesa.selecionada = !mesa.selecionada
      this.desmarcarOutras(mesa)
    },
    desmarcarOutras: function (mesa) {
      this.mesas.forEach((m) => {
        if (mesa.id !== m.id) {
          m.selecionada = false
        }
      })
    },
    selecionar: function () {
      this.setMesaSelecionada(this.mesas.find((mesa) => { return mesa.selecionada }))
      this.$router.push('/NovoPedido')
      this.$refs.Mesas.hide()
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
