// import axio
import axios from 'axios';


const Client = axios.create({
    baseURL: 'http://localhost:5000',
    responseType: 'json',
    withCredentials: true,

});


export default Client;