<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title v-if="this.token != null">Bienvenue  : {{ this.email }}</v-toolbar-title> -->
      <v-toolbar-title >Bienvenue {{ email }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
// utilisation de la composition API
// plus besoin d'export default ni de variables

// importation du magasin et des éléments de l'APi composition
import { getTokenStore } from '@/stores/test.js'
import { onBeforeMount, ref } from 'vue';

// ref -> propriété réactive
const email = ref('');
const drawer = ref(null);

// instanciation du magasin
const tokenStore = getTokenStore();

// récupération du token en local Storage
// fonction fléchée, plus de this
const updatedToken = (() => tokenStore.getLocalToken);

// Si le updatedToken existe, alors on définit la valeur de email sur 
// l'email contenu dans le token 
if(updatedToken()){
email.value = tokenStore.decodeToken(updatedToken());
// maj de la prop email du store
tokenStore.setEmail(email.value);
} else {
// Sinon on remet l'email à ''
email.value = '';
// maj de la prop token du store
tokenStore.setEmail('');
}

onBeforeMount(() => {
console.log('hey man !')
});
    
</script>
