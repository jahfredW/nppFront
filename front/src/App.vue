<template >
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title v-if="this.token != null">Bienvenue  : {{ this.email }}</v-toolbar-title> -->
      <v-toolbar-title >Bienvenue {{ pseudo }}</v-toolbar-title>
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
import { onBeforeMount, ref, onMounted, onUnmounted, onUpdated } from 'vue';

// ref -> propriété réactive
const pseudo = ref('');
const drawer = ref(null);


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


// onBeforeMount(() => {
//   console.log(test.value)

// })


</script>

<!-- <style>
[v-cloak] {
  display: none;
  content: "hello world";
}

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

#inspire:not([v-cloak]) ~ .loading {
display: none;
}
</style> -->
