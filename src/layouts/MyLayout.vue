<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="fas fa-hamburger" />
        </q-btn>

        <q-toolbar-title>
          House of Burger
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list class="q-mt-lg">
        <!--<q-item-label header>Essential Links</q-item-label>-->
        <q-item clickable to="/PedidoList">
          <q-item-section avatar>
            <q-icon name="mdi-file-document-edit-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pedidos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/ClienteList">
          <q-item-section avatar>
            <q-icon name="mdi-human-greeting" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
