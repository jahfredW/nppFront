import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './../node_modules/bulma/css/bulma.css';
import { createPinia } from 'pinia'

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(fas);

loadFonts()
 const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  // .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')



