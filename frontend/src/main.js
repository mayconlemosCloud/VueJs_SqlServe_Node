import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import  store  from './store/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import vuetify from './plugins/vuetify'

import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
