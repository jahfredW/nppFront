/* importation des modules nécessaires */
import Axios from './caller.service.js'


let uploadPictures = (credentials) => {
    return Axios.post('api/upload', credentials)
}

let addUser = (credentials) => {
    return Axios.post('api/admin/adduser', credentials)
}


let signup = (credentials) => {
    return Axios.post('api/signup', credentials)
}

// fonction  de login 
let login = (credentials) => {
    return Axios.post('api/login_check', credentials)
}

// fonction de logout
let logout = () => {
    localStorage.removeItem('token');
}

// Sauvegarde du token
let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let getToken = () => {
    return localStorage.getItem('token');
}

// Fonction de vérification de connection
let isLogged = () => {
    let token = localStorage.getItem('token');
    return !! token; /* le !! permet de tranformer une chaienen booleen  */
}



// permet d'exporter sous la forme d'un objet les 
// expressions de fonction. 
// A bien mettre à la fin du module ! 
export const accountService = {
    login,
    // logout, 
    saveToken,
    // isLogged,
    // getToken,
    signup, 
    uploadPictures,

    // addUser,
}