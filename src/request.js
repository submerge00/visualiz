import axios from "axios";
import {baseURL} from '../src/config'
var instance=axios.create(
    {
        baseURL,
        timeout:20000,
    }
);

export default instance