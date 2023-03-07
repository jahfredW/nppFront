<template>
  <div>
    <input type="file" multiple @change="onFileChange">
    <button @click="uploadFiles">Upload Files</button>
  </div>
</template>


<script>
  import { accountService } from './../../../_services/account.service';



export default {


  data(){
    return {
      files : []
    }
  },

  methods: {

    onFileChange(event) {
      // event.target.files : récupère une liste de files 
      // this.files : liste des fichiers qui seront envoyés au back end. 
      this.files = event.target.files;
      console.log(this.files);
    },

    uploadFiles(){
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files[]', this.files[i]);
        console.log(this.files[i])
    }
    for ( const [key, value] of formData.entries()){
      console.log(key, value);
    }

    accountService.addPhotos(formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>