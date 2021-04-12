import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/genshin',
    name: 'Genshin',
    component: () => import('../views/GenshinGacha.vue')
  },
  {
    path: '/bluearc',
    name: 'BlueArchive',
    component: () => import('../views/BlueArcGacha.vue')
  },
  {
    path: '/umamusu',
    name: 'Umamusu',
    component: () => import('../views/UmamusuGacha.vue')
  },
  {
    path: '/:name/results/:num',
    name: 'Results',
    component: () => import('../views/Results.vue'),
    meta: { checkFromPath: true }
  },{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.checkFromPath)){
    console.log(to)
    console.log(from)
    if(from.path==='/genshin'||from.path==='/bluearc'||from.path==='/umamusu'){
      next()
    } else {
      alert('Please enter from game page!')
      router.push({name: 'Home'})
    }
    
  } else {
    next()
  }
})

export default router
