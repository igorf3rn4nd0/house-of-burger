<template>
  <q-dialog @show="loadLanches" ref="Lanches">
    <div class="bg-white" style="width: 200px; height: 100px">
      <q-bar>
        <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" />
        <div>9:34</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="opcao-list shadow-2">Lanche 1</div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    abrir: function () {
      this.$refs.Lanches.show()
    },
    loadLanches: function () {
    }
  }
}
</script>

<style>
  .opcao-list{
    border-radius: 15px;
  }
</style>
