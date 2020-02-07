import Axios from 'axios';

const instance = Axios.create({
    baseURL:'https://burgerbuilder-9240b.firebaseio.com/'
});


export default instance;