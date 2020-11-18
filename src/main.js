import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// Filters
import localizeDate from './filters/localize-date';
// Styles
import './assets/styles/main.scss';

// Initialize filters with Vue instance
localizeDate(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
