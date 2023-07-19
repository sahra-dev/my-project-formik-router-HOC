import axios from "axios";

axios.defaults.baseURL= "https://formik-project-data.onrender.com"

const http ={
    get : axios.get ,
    post : axios.post ,
    delete : axios.delete ,
    put : axios.put
};


export default http