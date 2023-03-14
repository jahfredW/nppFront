<template>
  <v-container class="container mt-10 fluid">
  
  <v-form>
    <v-container>
      <h1 class="h3 text-center mb-5">Créer une nouvelle session</h1>
      <v-text-field v-model="sessionName" placeholder="nom de la session" label="Nom de la session">
        
      <div v-if="$v.sessionName && $v.sessionName.$error">Le nom est obligatoire.</div>

      </v-text-field>
      <div> 
        <v-file-input show-size counter prepend-icon="mdi-camera" multiple placeholder="test" @change="onFileChange" label="photos à uploader"></v-file-input>
      </div>
        <div class="mb-5">
          <VueDatePicker  v-model="sessionDate" :format="format"  month-name-format="long" placeholder="date de la session"></VueDatePicker>
        </div>
        <div>
          <v-select label="moment de la journée" v-model="sessionMoment" :items="items"></v-select>
        </div>
        
      <div>

      </div>
        

      <v-btn @click="uploadFiles">Upload !</v-btn>
    </v-container>
  </v-form>
</v-container>
</template>


<script setup>

import { accountService } from '../../../_services/account.service';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { onUpdated } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';





 
var files = ref([]);
const sessionDate = ref(new Date());
const sessionMoment = ref(null);
const items = ref(['matin', 'après-midi']);
const sessionName = ref("");


const router = useRouter();

const format = (sessionDate) => {
  const day = sessionDate.getDay();
  const month = sessionDate.getMonth() + 1;
  const year = sessionDate.getFullYear();


  return `Date sélectionnée : 0${day}/0${month}/${year}`;
}

const $v = useVuelidate({
  sessionName, sessionName: { required }
});



const convertDay = (month) => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }
  return months[month];
};


  // méthode de récupération des fichiers à envoyer 
const onFileChange = (event) => {
    // event.target.files : récupère une liste de files 
    // this.files : liste des fichiers qui seront envoyés au back end. 
    files = event.target.files;
  };

  // méthode qui permet d'uploader les fichiers 
const uploadFiles = () => {
    // définition de l'autorisation d'envoie à true
    let successUpload = [];
    let failureUpload = [];

    // tableau contenant les extensions possibles 
    const extension_tab = ['jpg', 'png', 'jpeg', 'gif', 'svg'];
    // instanciation d'un nouveau formulaire de payload avec l'objet FormData. 
    
    if( files.length > 0 ){
      for( let image of files) {
      // on essaie de spliter le nom de l'image, pour savoir si elle contient au moins un point  
      try{
        console.log(image);
        let splitImage = image.name.split(".");
        let imageSize = image.size;
        let extension = splitImage[splitImage.length - 1];
        // Si l'image a un point mais que la dernier élément du split n'appartient pas à la liste des extensions, on refuse l'envoie. 
        if (!extension_tab.includes(extension)){
          alert('Au moins une image contient une extension inconnue')
          failureUpload.push(image);
        }

        if (imageSize > 20000000){
          alert(`Désolé, mais l\'image ${image.name} dépasse la taille autorisée `)
          failureUpload.push(image);
        }
        
        
      }
      // Si l'image name ne contient aucun point, alors le format est inconnu, on refuse l'envoie
      catch {
        alert("erreur inconnue, merci de recommencer")
      }
    
    successUpload.push(image);
    }
    // Si le conteneur d'image est vide ou si l'autorisation d'envoie n'est pas accordée
    // on alerte l'utlisateur 
    if (successUpload.length === 0){
      alert("aucune image à envoyer ou extension invalide");
      // sinon on construit l'objet formData avec les uploads et on envoie sur le backend. 
    } else {
      const formData = new FormData();
      for (let i = 0; i < successUpload.length; i++) {
        formData.append('files[]', successUpload[i]);
        

        
      }

      formData.append('session_name', sessionName.value);
      formData.append('session_moment', sessionMoment.value);;
      let splitDate = sessionDate.value.toString().split(' ');
      let day = splitDate[2];
      let month = splitDate[1];
      let year = splitDate[3];
      let monthNumber = convertDay(month);
      let formatedDate = `${day}/${monthNumber}/${year}`;
      formData.append('session_date', formatedDate );

      accountService.uploadPictures(formData)
      .then(
        response => {
          files = [];
          alert(response.data);
          router.go(0);
        })
      .catch(
        error => {
          console.log(error);
        alert('Une erreur est survenue durant l\'envoie des fichiers')
      });
    }
    } else {
      alert("attention vous n'avez sélectionné aucun fichier")
    } //vérification de l'extension
    
  }

      
  


    

</script>


<!-- style du loading  -->



