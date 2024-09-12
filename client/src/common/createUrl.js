import { API_URL } from "./config/config"
import { basicUrl } from "./config/store.config";

export function createUrl(path=''){
    return basicUrl + path
}

export function createApiUrl(path=''){
    return API_URL + path
};