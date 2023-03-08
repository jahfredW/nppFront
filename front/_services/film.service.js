/* importation des modules nécessaires */
import Axios from './caller.service.js'

let countAllFilm = () => Axios.get('/api/films/count');

let getFilmList = (credentials) => Axios.get('/api/films', credentials);


// Exportation des fonctions sous la forme d'un objet 
export const FilmService = {
    countAllFilm,
    getFilmList
}

