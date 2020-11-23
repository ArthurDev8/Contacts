import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'
import nationalitiesFilter from '@/filters/nationalitiesFilter';
import birthdayFilter from "@/filters/birthdayFilter";
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify);
Vue.use(VueClipboard);
Vue.filter('nationalities', nationalitiesFilter);
Vue.filter('birthday', birthdayFilter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
