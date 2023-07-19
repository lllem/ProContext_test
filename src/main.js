import { createApp } from 'vue';
import BaseLayout from '@/components/BaseLayout.vue';
import SidebarLayout from '@/components/SidebarLayout.vue';
import MainNav from '@/components/MainNav.vue';
import PlateEl from '@/components/PlateEl.vue';
import ItemEl from '@/components/ItemEl.vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/styles/main.scss';

createApp(App)
  .use(store)
  .use(router)
  .component('BaseLayout', BaseLayout)
  .component('SidebarLayout', SidebarLayout)
  .component('MainNav', MainNav)
  .component('PlateEl', PlateEl)
  .component('ItemEl', ItemEl)
  .mount('#app');
