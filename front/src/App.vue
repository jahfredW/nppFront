<template >
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >Bienvenue {{ pseudo }}</v-toolbar-title>
    </v-app-bar>
    <v-main >
      <router-view/>
      <div class="loading d-flex flex-column align-items-center" v-if="loading">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <p>Chargement</p>
    </div>
    </v-main>
  </v-app>
</template>

<script setup>
// utilisation de la composition API
// plus besoin d'export default ni de variables

// importation du magasin et des éléments de l'APi composition
import { getTokenStore } from '@/stores/test.js'
import { ref } from 'vue';
import Axios from '../_services/caller.service';

// ref -> propriété réactive
const pseudo = ref('');
const drawer = ref(null);
const loading = ref(false);



// instanciation du magasin
const tokenStore = getTokenStore();

// récupération du token en local Storage
// fonction fléchée, plus de this
const updatedToken = (() => tokenStore.getLocalToken);

// Si le updatedToken existe, alors on définit la valeur de email sur 
// l'email contenu dans le token 
if(updatedToken()){
pseudo.value = tokenStore.decodeToken(updatedToken());
// maj de la prop email du store
tokenStore.setPseudo(pseudo.value);
} else {
// Sinon on remet l'email à ''
pseudo.value = '';
// maj de la prop token du store
tokenStore.setPseudo('');
}

Axios.interceptors.request.use(
    config =>  {
      console.log('request')
      // Afficher le loader global
      loading.value = true;
      return config;
    },
    function (error) {
        console.log('erreur')
      return Promise.reject(error);
    }
  );
  
  Axios.interceptors.response.use(
    function (response) {
      // Cacher le loader global
      loading.value = false;
      return response;
    },
    function (error) {
      // Cacher le loader global
      loading.value = false;
      return Promise.reject(error);
    }
  );


</script>

<style>

.loading {
  display: grid;
  place-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>







