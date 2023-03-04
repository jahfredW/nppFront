<template>
    <v-container class="container mt-15 px-10 py-10">
      <v-row class="mb-10">
        <v-col cols="12"  xs="12" sm="12" md="8" lg="8"  class="mx-auto text-center">
          <div class="text-h4">Formulaire de connexion</div>
        </v-col>
      </v-row>
      <v-form id="form" v-model="valid" ref="form">
            <v-row >
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" :counter="10" label="Email" required></v-text-field>
                </v-col>
                <v-col cols="12">
            <v-text-field id="password" class="w-100 text-left field" @input="change($event)"  type="password" v-model="password" :rules="passwordRules"
              :counter="10" label="Password" required>
                <v-icon class="icon" @click.prevent="toggleShow('password')">
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
                 <v-col cols="12">
                    <v-btn :disabled="!valid" color="success" @keyup.enter="submit" @click.prevent="submit">Validate</v-btn>
                </v-col>
      </v-form>
    </v-container>
        
  </template>
  
  <script>
  
  // le fait de mettre in index = pas besoin de préciser, il 
  // ira directement dans idnex.js 
  
  import { accountService } from './../../../_services/account.service'
  
  import VueJwtDecode from 'jwt-decode';
  
  
  export default {
      name : 'loginVue',
  
      data(){
        return {
          valid: true,
          password: '',
          verification: '',
          email: '',
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
        
              let formData = new FormData();
            //   console.log(this.checkLocal());          
              formData = {
              email : this.email,
              password : this.password, 
              }
            
            accountService.login(formData)
            .then( response => {
              let token = response.data.token;
              let decodedToken = VueJwtDecode(token);
              console.log(decodedToken);
              console.log(token);
  
              accountService.saveToken(token);
              this.$router.push('/');
              
            })
            .catch(error => {
              alert("Vous devez vous inscrire d'abord !");
              console.log(error);
            
            })
          
  
        },
  
        checkLocal(){
          return localStorage.user === undefined;
             
        },
  
        toggleShow(password) {
          let elt = this.$el.querySelector(`#${password}`);
          elt.type = elt.type === "password"? "text" : "password";
        },
  
        change(event){
          let target = event.target.id;
          let value  = event.target.value;
          let verifValue = this.$el.querySelector('#verification').value
          if (target == 'password' && verifValue != null ){
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
        
  
        disconnect(){
          localStorage.clear();
          location.reload();
        },
  
        findClient() {
          
              var formData = new FormData();
              console.log(this.checkLocal());    
              formData = {
                  email : this.email
              }
              
            axios
            .post('http://127.0.0.1:3000/api/auth/find', formData)
            .then( response => {
              let data = response.data['data'];
              for ( var prop in data) {
                  console.log(data[prop])
              }
       
            })
            .catch(error => {
              alert("Vous devez vous reconnecter d'abord !");
              console.log(error);
              localStorage.clear();
              location.reload();
            
            })
          },
  
        },  
  
  }
  </script>
  
  <style>
  
  .container {
    position: relative;
    background: white;
    border-radius: 45px;
    width: 50%;
    transform: scale(1);
    font-weight: lighter;
    transition: box-shadow 2s, transform 0.5s, background-color 1.5s;
  }
  
  .container:hover {
    box-shadow: 0 5px 35px 0px rgba(0,0,0,.1);
    background-color: rgb(232, 238, 240);
    transform: scale(1.05);
  }
  
  
  
  
  
  @media only screen and (max-width: 500px) {
    
    .container{
      border-radius: 10% 10%;
      width: 80%;
    }
  }
  </style>