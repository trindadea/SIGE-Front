
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/transductors',
    component: () => import('components/transductors/Transductors.vue'),
    children: [
      { path: '/:id', component: () => import('components/transductors/Show.vue'), props: true },
      { path: '/:id/edit', component: () => import('components/transductors/Form.vue'), props: true },
      { path: '/new', component: () => import('components/transductors/Form.vue') }
    ]
  },
  {
    path: '/servers',
    component: () => import('components/slaves/Slaves.vue'),
    children: [
      { path: '/:id', component: () => import('components/slaves/Show.vue'), props: true },
      { path: '/:id/edit', component: () => import('components/slaves/Form.vue'), props: true },
      { path: '/new', component: () => import('components/slaves/Form.vue') }
    ]
  },
  {
    path: '/buildings',
    component: () => import('components/buildings/Buildings.vue'),
    children: [
      { path: '/:id', component: () => import('components/buildings/Show.vue'), props: true },
      { path: '/:id/edit', component: () => import('components/buildings/Form.vue'), props: true },
      { path: '/new', component: () => import('components/buildings/Form.vue') }
    ]
  },
  {
    path: '/campi',
    component: () => import('components/campi/Campi.vue'),
    children: [
      { path: '/:id', component: () => import('components/campi/Show.vue'), props: true },
      { path: '/:id/edit', component: () => import('components/campi/Form.vue'), props: true },
      { path: '/new', component: () => import('components/campi/Form.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('components/dashboard/Dashboard.vue')
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
