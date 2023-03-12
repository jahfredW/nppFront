<template>
    <div>
      <button @click="downloadFile">Télécharger le fichier download</button>
      <!-- <v-img cover class="client-picture" :width="300" :src="this.fileUrl" @contextmenu="handler($event)"></v-img> -->
    </div>
  </template>
  
  <script>

import axios from 'axios'
import { onMounted } from 'vue';
  
  export default {
    name: 'DownloadFile',
    data() {
      return {
        fileUrl: ''
      }
    },
    methods: {
      downloadFile() {
        axios.get('https://localhost:8000/api/downloadFile').then(response => {
            console.log(response.data);
            this.fileUrl = response.data
            return this.fileUrl;
            window.location.href = this.fileUrl
        }).catch(error => {
          console.log(error)
        })
      },

      handler(event) {
        event.preventDefault();
        alert('Acheter?')
      },

      computed : {
        loadingImage(){
            return this.fileUrl;
        }
        
    }
    },

    // mounted(){
    //     this.downloadFile();
    // }
  }
  </script>

<style lang="scss">

.client-picture{
    scale: 1;
    transition: transform  1s ease;

    &:hover{
        transform: scale(1.2);
    }
}


</style>