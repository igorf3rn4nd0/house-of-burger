<template>
  <q-page padding>
    <q-table
      :data="pedidos"
      :columns="columns"
      row-key="name"
      selection="single"
      :filter="filter"
      :selected.sync="pedidosSelecionados"
      :grid="$q.platform.is.mobile"
      table-style="min-height: 60vh; max-height: 40vh"
    >

      <template v-slot:top-left>
        <div class="row items-center">
          <span style="font-size: 15pt">Pedidos</span>
          <template v-if="pedidosSelecionados.length > 0 && $q.platform.is.desktop">
            <q-btn class="q-ml-lg" @click="abrirPedido" round flat dense color="grey" icon="mdi-pencil"></q-btn>
          </template>
        </div>
      </template>
      <template v-slot:top-right>
        <q-input :input-style="$q.platform.is.mobile ? 'max-width: 150px' : ''" rounded outlined dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2 q-pb-sm' : 'q-pb-sm'">
            <q-card-section>
              <div class="row justify-between">
                <div class="col-9">
                  <q-checkbox dense v-model="props.selected" :label="'Nº ' + props.row.id" />
                </div>
                <div v-if="props.selected" class="col-3">
                  <div class="row">
                    <q-btn @click="abrirPedido" class="q-mr-sm" round flat dense color="grey" icon="mdi-pencil"></q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <div class="row q-px-md q-py-sm" v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.id">
              <div v-if="col.label !== 'Nº'" class="column items-start">
                <span class="text-grey-7">{{ col.label }}</span>
                <span>{{ col.value }}</span>
              </div>
            </div>
          </q-card>
        </div>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="mdi-plus" direction="up">
        <q-fab-action icon="" @click="selecionarMesa" color="primary">
          <q-icon class="q-pb-lg">
            <img style="width: 20px" src="../assets/table.png"/>
          </q-icon>
        </q-fab-action>
        <q-fab-action @click="selecionarCliente" color="primary" icon="mdi-human-greeting" />
      </q-fab>
    </q-page-sticky>
    <selecionar-mesa ref="SelecionarMesaDialog"></selecionar-mesa>
    <selecionar-cliente ref="SelecionarClienteDialog"></selecionar-cliente>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import SelecionarMesa from '../components/SelecionarMesa'
import SelecionarCliente from '../components/SelecionarCliente'
export default {
  // name: 'PageName',
  components: { SelecionarMesa, SelecionarCliente },
  data () {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'Nº', field: 'id', sortable: true },
        { name: 'cliente', align: 'left', label: 'Cliente', sortable: true, field: row => row.cliente.nome },
        { name: 'valor', align: 'left', label: 'Valor', field: 'valor', sortable: true }
      ],
      filter: '',
      pedidosSelecionados: []
    }
  },
  beforeMount: function () {
    console.log(this.pedidos)
  },
  computed: {
    ...mapState('Pedido', ['pedidos'])
  },
  methods: {
    abrirPedido: function () {
      //
    },
    selecionarMesa: function () {
      this.$refs.SelecionarMesaDialog.abrir()
    },
    selecionarCliente: function () {
      this.$refs.SelecionarClienteDialog.abrir()
    }
  }
}
</script>

<style>
</style>
