import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify);
Vue.use(VueClipboard);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
