import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import vuetify from './plugins/vuetify';
import loginToolBar from './components/loginToolbar'
import Appfooter from './components/footer'
import sideBar from './components/sideBar'


Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(vuetify)
Vue.component('loginToolBar', loginToolBar);
Vue.component('Appfooter', Appfooter);
Vue.component('sideBar', sideBar);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
