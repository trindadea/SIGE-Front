const routes = [
  {
    path: '/dashboard',
    component: () => import('components/dashboard/DashboardBase.vue')
  },
  {
    path: '/',
    component: () => import('../layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('components/home/Home.vue')
      },
      {
        path: '/transductor_list',
        component: () => import('components/transductorList/TransductorList.vue')
      },
      {
        path: '/about',
        component: () => import('pages/About.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/total_cost', component: () => import('pages/TotalCost.vue')
      },
      {
        path: '/transductor/:id',
        component: () => import('pages/Transductor.vue')
      }
    ]
  },
  {
    path: '/users',
    component: () => import('../layouts/AuthBase.vue'),
    children: [
      {
        path: 'login',
        component: () => import('components/users/Login.vue')
      },
      {
        path: 'register',
        component: () => import('components/users/Register.vue')
      },
      {
        path: 'edit',
        meta: {
          requiresAuth: true
        },
        component: () => import('components/users/UserUpdate.vue')
      },
      {
        path: 'logout',
        component: () => import('components/users/Logout.vue')
      }
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
