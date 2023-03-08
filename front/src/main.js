import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './../node_modules/bulma/css/bulma.css';
import { createPinia } from 'pinia'
// import { LoadingDirective } from './directives'
// import { LoadingMixin } from './mixins'
import { Loader } from './components'

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(fas);

loadFonts()
 const pinia = createPinia();

const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  // .component('Loader', Loader)
  // .mixin(LoadingMixin)
  // .directive("loading", LoadingDirective);
  
  // .component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')



  

 




