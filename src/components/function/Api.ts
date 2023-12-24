import axios from "axios";
import {Log, User} from "../../base/User";
import {TokenUser} from "./Utils";
import {Product} from "../../base/Product";
interface ConfigType {
    headers?: {
        Authorization?: string;
    };
}
// const host = 'http://102.16.82.3:8000'
// const host = 'http://192.168.245.45:8000'
const host = 'http://192.168.88.9:8000'
// const host = 'http://localhost:8000'
export const getCall = (url:string, auth = false,customHeaders = {}) => {
    let config:ConfigType = {}
    if (auth) {
        config = { headers: { Authorization: `Bearer ${localStorage.getItem(TokenUser)}` } }
    }
    config.headers = { ...config.headers, ...customHeaders }
    return axios
        .get(url, config)
        .then((res:any) =>
            res.status === 200 || res.status === 201 || res.status === 202 ? res : Promise.reject(res),
        )
        .then((res:any) => res.data.data)
        .catch((error:any) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    // Create a custom Axios error with a modified error message
                    throw new axios.Cancel(error.response.data.error)
                } else if (error.message === 'Network Error') {
                    throw new axios.Cancel('Veuillez vérifier votre connexion internet.')
                }
            }
            throw error
        })
}
export const postCall = (url:string, data:any, auth = false) => {
    let config = {}
    if (auth) {
        config = { headers: { Authorization: `Bearer ${localStorage.getItem(TokenUser)}` } }
    }
    return axios
        .post(url, data, config)
        .then((res:any) =>
            res.status === 200 || res.status === 201 || res.status === 202 ? res : Promise.reject(res),
        )
        .then((res:any) => res.data.data)
        .catch((error:any) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    // Create a custom Axios error with a modified error message
                    throw new axios.Cancel(error.response.data.error)
                } else if (error.message === 'Network Error') {
                    throw new axios.Cancel('Veuillez vérifier votre connexion internet.')
                }
            }
            throw error
        })
}
export const putCall = (url:string, data:any, auth = false, customHeaders = {}) => {
    let config = {}
    if (auth) {
        config = { headers: { Authorization: 'Bearer ' + localStorage.getItem(TokenUser) } }
    }
    return axios
        .put(url, data, config)
        .then((res:any) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res:any) => res.data.data)
        .catch((error:any) => {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error(error)
                    // Create a custom Axios error with a modified error message
                    throw new axios.Cancel(error.response.data.error)
                } else if (error.message === 'Network Error') {
                    throw new axios.Cancel('Veuillez vérifier votre connexion internet.')
                }
            }
            throw error
        })
}
//login
const LogURI = `${host}/user/login`
//product
const AllProductURI = `${host}/product/all/`
const UpdateCodeURI = `${host}/product/update_bar`
const searchProductURI = `${host}/product/search/`

export function login(data:Log) {
    return postCall(LogURI,data)
}

export function getAllProduct(page:number,size:number){
    const uri = AllProductURI + page +'/'+size
    return getCall(uri,true)
}
export function getoneProduct(id:number){
    const uri = AllProductURI + id
    console.log(uri)
    return getCall(uri,true)
}
export function SearchProduct(filterClass:any,page:number,size:number){
    const uri = searchProductURI + page +'/'+size
    return postCall(uri,filterClass,true)
}
export function UpdateCodeBar(data:Product){
    console.log(JSON.stringify(data))
    return postCall(UpdateCodeURI,data,true)
}
