<template>
  <!-- chargement du loader -->
  <div class="loading d-flex flex-column align-items-center" v-if="isLoading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <p>Chargement</p>
    </div>
  <!-- chargement du formulaire d'envoie des photos  -->
  <div v-else>
    <input type="file" multiple @change="onFileChange">
    <button @click="uploadFiles">Upload Files</button>
  </div>
</template>


<script>
  import { accountService } from './../../../_services/account.service';



export default {

  data(){
    return {
      files : [],
      isLoading : false,
    }
  },

  methods: {
    // méthode de récupération des fichiers à envoyer 
    onFileChange(event) {
      // event.target.files : récupère une liste de files 
      // this.files : liste des fichiers qui seront envoyés au back end. 
      this.files = event.target.files;
      console.log(this.files);
    },

    // méthode qui permet d'uploader les fichiers 
    uploadFiles(){
      // définition de l'autorisation d'envoie à true
      let sendOk = true;
      // tableau contenant les extensions possibles 
      const extension_tab = ['jpg', 'png', 'jpeg', 'gif', 'svg'];
      // chargement du loader 
      this.isLoading = true;
      // instanciation d'un nouveau formulaire de payload avec l'objet FormData. 
      const formData = new FormData();

      //vérification de l'extension
      for( let image of this.files) {
        // on essaie de spliter le nom de l'image, pour savoir si elle contient au moins un point  
        try{
          let splitImage = image.name.split(".");
          let extension = splitImage[splitImage.length - 1];
          // Si l'image a un point mais que la dernier élément du split n'appartient pas à la liste des extensions, on refuse l'envoie. 
          if (!extension_tab.includes(extension)){
            alert('Au moins une image contient uen extension inconnue')
            sendOk = false;
            break;
          }
        }
        // Si l'image name ne contient aucun point, alors le format est inconnu, on refuse l'envoie
        catch {
          alert("format inconnu")
          sendOk = false;
          break;
        }
        
      }
    // Si le conteneur d'image est vide ou si l'autorisation d'envoie n'est pas accordée
    // on alerte l'utlisateur 
    if (this.files.length === 0  || !sendOk){
      alert("aucune image à envoyer ou extension invalide");
      this.isLoading = false;
      // sinon on construit l'objet formData avec les uploads et on envoie sur le backend. 
    } else {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files[]', this.files[i]);
        
      }
      accountService.uploadPictures(formData)
      .then(
        response => {
          this.isLoading = false;
          alert('Les fichiers ont été uploadés avec succès')
      })
      .catch(
        error => {
        this.isLoading = false;
        alert('Une erreur est survenue durant l\'envoie des fichiers')
      });
    }
    
    }
  }
}
</script>


<!-- style du loading  -->
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