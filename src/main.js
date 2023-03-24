import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import VueRouter from 'vue-router'
import vco from "v-click-outside"
import router from './router/index'
import Scrollspy from 'vue2-scrollspy';
import "../src/design/app.scss";
import store from '@/state/store'
import App from './App.vue'
import i18n from './i18n'
import tinymce from 'vue-tinymce-editor'
import VueBootstrapToasts from "vue-bootstrap-toasts";
import axios from 'axios'
// Import the component
import VueSearchSelect from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css';

// Register the component globally
Vue.component('vue-search-select', VueSearchSelect);


if (process.env.NODE_ENV === 'production') {
axios.defaults.baseURL = 'https://voteapi.stonixgraphics.com/api/' //production
} else {
axios.defaults.baseURL = 'http://localhost:3000/api/' //development
}
Vue.use(VueBootstrapToasts);
Vue.component('tinymce', tinymce)
Vue.use(VueRouter)
Vue.use(vco)
Vue.use(Scrollspy);
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
