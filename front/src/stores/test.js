import { defineStore } from 'pinia';
import VueJwtDecode from 'jwt-decode';

// instanciation d'un nouveau magasin id = getToken
// utilisation du magasin d'options 
// définition des propriétés token, email et sta
export const getTokenStore = defineStore('getToken', {
  state: () => ({
    token : '',
    email : '',
    sta : false,
  }),

  getters: {
    getLocalToken : (state) => state.token = localStorage.getItem('token'),
    getLocalState : (state) => state.sta = !state.sta
  },

  actions: {
    decodeToken(token) {
       return VueJwtDecode(token).username;
    },

    setEmail(email){
        this.email = email;
    }
  }});
