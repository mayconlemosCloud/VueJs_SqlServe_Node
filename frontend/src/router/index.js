import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Sobre from '../views/Sobre'
import Usuarios from '../views/Usuarios'
import Departamento from '../views/Departamento'
import Centrocusto from '../views/CentroCusto'
import store from "../store/index"


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: Usuarios,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/departamento',
    name: 'Departamento',
    component: Departamento,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/centrocusto',
    name: 'Centrocusto',
    component: Centrocusto,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Sobre',
    name: 'Sobre',
    component: Sobre,
    meta: { requiresAuth: true } 
  },
  {
    path: '/',
    name: 'Home', 
    component: Home,
    meta: {
      requiresAuth: true,
    },
  }
]

const router = new VueRouter({
  mode: 'history',  
  routes
})

// ===============
// Protegendo as rotas, comunicação via VUEX
// ===============


router.beforeEach(async (to,from,next)=>{

  const auth = store.getters["auth/isTokenActive"];
 
 console.log(auth)
  if(to.matched.some(record =>record.meta.requiresAuth)){

    if(auth){
      console.log('autenticado')
      return next()
    }else{
      console.log('não atenticado')
      return next({path: '/login'});
    }

  }else{
    return next();
  }
 


 
})




export default router
