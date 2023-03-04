import axios from "axios"
// import { accountService } from "./account.service";
// import router from '@/router'

/* ce module défini la configuration initiale de axios, 
et paramètre le header */



const Axios = axios.create({
    // baseURL: 'https://fredgruwedev.com'
    baseURL : 'https://localhost:8000',
    // headers: {'X-Custom-Header': 'foobar'},
    withCredentials: true,
})

axios.defaults.headers["content-type"] = "application/json";


Axios.defaults.headers.common["Authorization"] = "Bearer, " + localStorage.getItem("token");



export default Axios
// Axios.defaults.headers.common["Authorization"] =
//   "Bearer, " + localStorage.getItem("token");

// Interceptor des réponses de l'api

// Axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     if(error.response.status == 401){
//         accountService.logout();
//         router.push('/login');
//         alert('Désolé, vous n etes pas autorisé ! ')}
//     // else if(error.response.status == 500){
//     //     alert("Erreur lors de l'enregistrement popo ! ") 
//     //     location.reload();
//     // }
// })



// axios interceptor, si connecté alors le token est 
// ajouté dans l'entête.
// Interceptor pour injection token
// Axios.interceptors.request.use(request => {
//     if(accountService.isLogged()){
//         request.headers.Authorization = 'Bearer, '+ accountService.getToken();
//     }
//     console.log(request)
//     return request;
// })
