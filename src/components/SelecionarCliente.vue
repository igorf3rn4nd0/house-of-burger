<template>
  <q-dialog :maximized="$q.platform.is.mobile" @show="onShow" ref="Clientes">
    <div class="bg-white q-pa-lg" style="position: relative; min-width: 60vw; border-radius: 15px;">
      <div class="row justify-end q-mb-md">
        <!--<div class="text-primary text-h5">
          Selecione um Cliente
        </div>
        <q-space/>-->
        <q-btn dense round flat icon="close" color="primary" v-close-popup/>
      </div>
      <div class="scroll">
        <q-table
          title="Selecione um Cliente"
          class="no-box-shadow q-mb-xl"
          :data="clientes"
          :columns="columns"
          row-key="id"
          selection="single"
          hide-bottom
          :filter="filter"
          table-style="min-height: 60vh; max-height: 60vh; overflow-y:hidden"
          :selected.sync="clientesSelecionados"
          :grid="$q.platform.is.mobile"
        >
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
      </div>
      <div class="row q-pa-md" style="position: absolute; bottom: 0; right: 0">
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
      filter: '',
      clientes: [],
      clientesSelecionados: [],
      columns: [
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone', sortable: true },
        { name: 'endereco', align: 'left', label: 'Endereço', field: 'endereco', sortable: true }
      ]
    }
  },
  computed: {
    ...mapState('Cliente', ['clientesOptions'])
  },
  methods: {
    ...mapActions('Cliente', ['setClienteSelecionado']),
    abrir: function () {
      this.$refs.Clientes.show()
    },
    onShow: function () {
      this.clientes = cloneDeep(this.clientesOptions)
    },
    selecionar: function () {
      this.setClienteSelecionado(this.clientes.find((cliente) => { return cliente.selecionado }))
      this.$router.push('/NovoPedido')
      this.$refs.Clientes.hide()
    }
  }
}
</script>

<style>
</style>
