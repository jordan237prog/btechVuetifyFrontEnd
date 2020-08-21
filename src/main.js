import Vue from 'vue'
import VueCloneya from 'vue-cloneya'
import App from './App.vue'
import { router } from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import vuetify from './plugins/vuetify';
import loginToolBar from './components/loginToolbar'
import Appfooter from './components/footer'
import sideBar from './components/sideBar'
import billinputGroup from './components/billInputGroupe'
import pdfView from './components/pdfView'



Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(vuetify)
Vue.use(VueCloneya)
Vue.component('loginToolBar', loginToolBar);
Vue.component('Appfooter', Appfooter);
Vue.component('sideBar', sideBar);
Vue.component('bill-input-group', billinputGroup); 
Vue.component('pdf-view', pdfView); 

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
