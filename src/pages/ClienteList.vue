<template>
  <q-page padding>
    <q-table
      :data="clientesOptions"
      :columns="columns"
      row-key="name"
      selection="single"
      :filter="filter"
      table-style="min-height: 60vh; max-height: 40vh"
      :selected.sync="clientesSelecionados"
      :grid="$q.platform.is.mobile"
    >

      <template v-slot:top-left>
        <div class="row items-center">
          <span style="font-size: 15pt">Clientes</span>
          <template v-if="clientesSelecionados.length > 0 && $q.platform.is.desktop">
            <q-btn @click="abrirClienteForm" round flat dense class="q-mx-md" color="grey" icon="mdi-pencil"></q-btn>
            <q-btn round flat dense color="red" icon="mdi-delete"></q-btn>
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
                <div class="col-auto">
                  <q-checkbox dense v-model="props.selected" :label="props.row.nome" />
                </div>
                <div v-if="props.selected" class="col-auto">
                  <div class="row">
                    <q-btn @click="abrirClienteForm" round flat dense color="grey" icon="mdi-pencil"></q-btn>
                    <q-btn round flat dense color="red" class="q-ml-lg q-mr-sm" icon="mdi-delete"></q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <div class="row q-px-md q-py-sm" v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.id">
              <div v-if="col.label !== 'Nome'" class="column items-start">
                <span class="text-grey-7">{{ col.label }}</span>
                <span>{{ col.value }}</span>
              </div>
            </div>
          </q-card>
        </div>
      </template>
    </q-table>
    <cliente-form ref="clienteForm"></cliente-form>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="abrirClienteForm" round color="primary" icon="mdi-plus" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import ClienteForm from '../components/ClienteForm'
export default {
  components: { ClienteForm },
  data () {
    return {
      columns: [
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone', sortable: true },
        { name: 'endereco', align: 'left', label: 'Endereço', field: 'endereco', sortable: true }
      ],
      clientesSelecionados: [],
      filter: ''
    }
  },
  computed: {
    ...mapState('Cliente', ['clientesOptions'])
  },
  methods: {
    abrirClienteForm: function () {
      this.$refs.clienteForm.abrir()
    }
  }
}
</script>

<style>
</style>
