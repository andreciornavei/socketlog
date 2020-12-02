import { SERVER_URL, SERVER_PORT } from '@env'
import axios from "axios"
import auth from "./auth"

export default function () {

    let token = undefined

    const api = axios.create({
        baseURL: `${SERVER_URL}:${SERVER_PORT}`
    });

    api.interceptors.request.use(async (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return {
        auth: (module, data) => auth[module](api, data)
    }
}