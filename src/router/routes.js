
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/PedidoList', component: () => import('pages/PedidoList.vue') },
      { path: '/NovoPedido', component: () => import('pages/NovoPedido.vue') },
      { path: '/ClienteList', component: () => import('pages/ClienteList.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
