import { API_URL } from './Config';
import axios from 'axios';

async function getRequest(url=''){
    try {
        let response = await axios.get(API_URL + url);
        return response.data.response.docs;
    } catch (error) {
        console.log(`An error occurred while fetching data\n${error}`);
    }
}

export { getRequest };