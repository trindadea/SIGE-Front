
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
    component: () => import('components/transductors/TransductorsBase.vue'),
    children: [
      {
        path: '',
        component: () => import('components/transductors/Transductors.vue')
      },
      {
        path: 'new',
        component: () => import('components/transductors/Form.vue')
      },
      {
        path: ':id',
        component: () => import('components/transductors/Show.vue'),
        props: true
      },
      {
        path: ':id/edit',
        component: () => import('components/transductors/Form.vue'),
        props: true
      }
    ]
  },
  {
    path: '/servers',
    component: () => import('components/slaves/SlavesBase.vue'),
    children: [
      {
        path: '',
        component: () => import('components/slaves/Slaves.vue')
      },
      {
        path: 'new',
        component: () => import('components/slaves/Form.vue')
      },
      {
        path: ':id',
        component: () => import('components/slaves/Show.vue'),
        props: true
      },
      {
        path: ':id/edit',
        component: () => import('components/slaves/Form.vue'),
        props: true
      }
    ]
  },
  {
    path: '/buildings',
    component: () => import('components/buildings/BuildingsBase.vue'),
    children: [
      {
        path: '',
        component: () => import('components/buildings/Buildings.vue')
      },
      {
        path: 'new',
        component: () => import('components/buildings/Form.vue')
      },
      {
        path: ':id',
        component: () => import('components/buildings/Show.vue'),
        props: true
      },
      {
        path: ':id/edit',
        component: () => import('components/buildings/Form.vue'),
        props: true
      }
    ]
  },
  {
    path: '/campi',
    component: () => import('components/campi/CampiBase.vue'),
    children: [
      {
        path: '',
        component: () => import('components/campi/Campi.vue')
      },
      {
        path: 'new',
        component: () => import('components/campi/Form.vue')
      },
      {
        path: ':id',
        component: () => import('components/campi/Show.vue'),
        props: true
      },
      {
        path: ':id/edit',
        component: () => import('components/campi/Form.vue'),
        props: true
      }
    ]
  },
  {
    path: '/transductor_models',
    component: () => import('components/transductorModel/TransductorModelBase.vue'),
    children: [
      {
        path: '',
        component: () => import('components/transductorModel/TransductorModels.vue')
      },
      {
        path: 'new',
        component: () => import('components/transductorModel/Form.vue')
      },
      {
        path: ':id',
        component: () => import('components/transductorModel/Show.vue'),
        props: true
      },
      {
        path: ':id/edit',
        component: () => import('components/transductorModel/Form.vue'),
        props: true
      }
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
