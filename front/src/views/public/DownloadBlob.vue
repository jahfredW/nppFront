<template>
    <div>
      <button @click="downloadWithAxios('test')">Télécharger le fichier</button>
    </div>
  </template>
  
  <script>

  import axios from 'axios'
  
  export default {
    name: 'DownloadFile'
  
    ,
    methods: {
    forceFileDownload(response, title) {
      console.log(title)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title + '.jpg')
      document.body.appendChild(link)
      link.click()
    },
    downloadWithAxios(title) {
      axios({
        method: 'get',
        url: 'https://localhost:8000/api/downloadFile',
        responseType: 'blob',
       
      })
        .then((response) => {
          this.forceFileDownload(response, title)
        })
        .catch(() => console.log('error occured'))
    },
  }}
  
  </script>