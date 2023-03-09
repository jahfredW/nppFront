<template>
  <div>
    <input type="file" multiple @change="onFileChange">
    <button @click="uploadFiles">Upload Files</button>
  </div>
</template>


<script>

import { accountService } from '../../../_services/account.service';



export default {

  data(){
    return {
      files : [],
    }
  },

  methods: {
    // méthode de récupération des fichiers à envoyer 
    onFileChange(event) {
      // event.target.files : récupère une liste de files 
      // this.files : liste des fichiers qui seront envoyés au back end. 
      this.files = event.target.files;
    },

    // méthode qui permet d'uploader les fichiers 
    uploadFiles(){
      // définition de l'autorisation d'envoie à true
      let sendOk = true;
      let successUpload = [];
      let failureUpload = [];
      // tableau contenant les extensions possibles 
      const extension_tab = ['jpg', 'png', 'jpeg', 'gif', 'svg'];
      // instanciation d'un nouveau formulaire de payload avec l'objet FormData. 
      const formData = new FormData();

      //vérification de l'extension
      for( let image of this.files) {
        // on essaie de spliter le nom de l'image, pour savoir si elle contient au moins un point  
        try{
          console.log(image);
          let splitImage = image.name.split(".");
          let imageSize = image.size;
          let extension = splitImage[splitImage.length - 1];
          // Si l'image a un point mais que la dernier élément du split n'appartient pas à la liste des extensions, on refuse l'envoie. 
          if (!extension_tab.includes(extension)){
            alert('Au moins une image contient uen extension inconnue')
            sendOk = false;
            failureUpload.push(image);
            // break;
          }

          if (imageSize > 2000000){
            alert(`Désolé, mais l\'image ${image.name} dépasse la taille autorisée `)
            sendOk = false;
            failureUpload.push(image);
            break;
          }
          
          
        }
        // Si l'image name ne contient aucun point, alors le format est inconnu, on refuse l'envoie
        catch {
          alert("format inconnu")
          failureUpload.push(image);
          sendOk = false;
          break;
        }
      
        successUpload.push(image);
      }
      console.log(successUpload);
      console.log(failureUpload);
      // Si le conteneur d'image est vide ou si l'autorisation d'envoie n'est pas accordée
      // on alerte l'utlisateur 
      if (this.files.length === 0  || !sendOk){
        alert("aucune image à envoyer ou extension invalide");
        // sinon on construit l'objet formData avec les uploads et on envoie sur le backend. 
      } else {
        for (let i = 0; i < this.files.length; i++) {
          formData.append('files[]', this.files[i]);
          
        }
        accountService.uploadPictures(formData)
        .then(
          response => {
            this.files = [];
            this.$router.go(0);
            alert('Les fichiers ont été uploadés avec succès')
        })
        .catch(
          error => {
          alert('Une erreur est survenue durant l\'envoie des fichiers')
        });
      }
      
      }
    }
}
</script>


<!-- style du loading  -->



