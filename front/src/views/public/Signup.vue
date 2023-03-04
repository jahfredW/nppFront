<template >
    <v-container class="container mt-12">
      <v-form @submit="submit" id="form" v-model="valid" ref="form">
        <h3 class="mb-5 text-center">
          Formulaire d'inscription :
        </h3>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="pseudo" :rules="pseudoRules" :counter="10" label="Pseudo" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="email" :rules="emailRules" :counter="20" label="Email" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
          <v-text-field id="password1" class="w-100 text-left field" @input="change($event)"  type="password" v-model="password" :rules="passwordRules"
            :counter="10" label="Password" required>
              <v-icon class="icon" @click.prevent="toggleShow('password1')">
                mdi-eye-check
              </v-icon>
          </v-text-field>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field id="verification" class="w-100 text-left field" type="password" @input="change($event)" v-model="verification" :rules="verifRules" :counter="10" label="Confirmez" required>
                <v-icon class="icon" @click.prevent="toggleShow('verification')">
                  mdi-eye-check
                </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
        <v-checkbox
              v-model="agree"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Je suis d'accord avec la politique de traitement des données"
              required
          ></v-checkbox>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="success" class="mr-4" @keyup.enter="submit" @click.prevent="submit">Soumettre
          </v-btn>
        </v-col>
      </v-form>
      <div class="mt-10">
      <p v-if=this.agree>
        * Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par fredGruweDev.com pour sauvegarde. La base légale du traitement est [base légale du traitement].
  
  Les données collectées seront communiquées aux seuls destinataires suivants : [destinataires des données].
  
  Les données sont conservées pendant la durée de conservation des données prévue par le responsable du traitement ou critères permettant de la déterminer.
  
  Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données.
  Vous pouvez retirer à tout moment votre consentement au traitement de vos données ; Vous pouvez également vous opposer au traitement de vos données ; Vous pouvez également exercer votre droit à la portabilité de vos données
  
  Consultez le site cnil.fr pour plus d’informations sur vos droits.
  
  Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter (le cas échéant, notre délégué à la protection des données ou le service chargé de l’exercice de ces droits).
  
  Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
      </p>
    </div>
    </v-container>
  </template>
  
  
  <script>
  
  
  import { accountService } from './../../../_services/account.service';
  
  export default {
    name: 'SignupVue',
  
    data(){
       return {
        valid: true,
        agree: false,
        type1 : 'password',
        type2 : 'password',
        nom: "",
        prenom: "",
        pseudo: "",
        password: '',
        email: '',
        verification: '',
        showPassword: false,
        verifPassword: false,
        passwordListe : [],
        maxLenght : 5,
        basicRules: [
          v => !!v || "Ce champs ne peut pas être vide!",
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits"
        ],
        pseudoRules: [
          v => !!v || 'Password is required',
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits",
          v => ( v.length <= 10 ) || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v =>  ( v.length <= 10 ) || 'Name must be less than 10 characters',
        ],
        verifRules: [
          v => !!v || 'Password is required',
          v => v == this.password || ' Le mot de passe de correspond pas !',
        ]
      }
    },
  
  
    methods: {
  
  
      submit() {
  
          var formData = new FormData();
          formData = {
            pseudo: this.cleanUp(this.pseudo),
            email: this.cleanUp(this.email),
            password: this.password,
            verification: this.verification,

          }
          
          console.log(formData);
  
          accountService.signup(formData)
            .then(response => {
              console.log(response);
            this.$router.push('/');
            })
            .catch(error => {
              alert("Oups une erreur est survenue !");
              console.log(error.response);
              if (error.response.status == 404) {
                this.$router.push('/test');
            }})
  
        
      },
  
      toggleShow(password) {
        let elt = this.$el.querySelector(`#${password}`);
        elt.type = elt.type === "password"? "text" : "password";
      },

      change(event){
        let target = event.target.id;
        let value  = event.target.value;
        let verifValue = this.$el.querySelector('#verification').value
        if (target == 'password1' && verifValue != null ){
          this.password = value;
          verifValue = null;
          this.verification = "";
        } else if (target == 'verification'){
          this.verification = value;}
      },
  
      checkLocal() {
        return localStorage.user === undefined;
  
      },
  
      cleanUp(data) {
        return data.toLowerCase().trim().replace(/[!$(){}[\]\s:;<+?\\>]/g, '');
      },
    },
  }
  

  
  </script>
  
  
<style>
.container{
  box-sizing: border-box;
  margin-top: 10vh;
}

.w {
  width: 10vw;
}
.field{
  position: relative;
}
.icon{
  position: absolute;
  right: 2vw;
  top: 30%;
}
</style>