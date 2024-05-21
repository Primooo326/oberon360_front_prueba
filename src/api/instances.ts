import { API_BASE_URL, API_WEB_URL, API_IC_URL } from "@/config";
import axios, { type AxiosResponse, type ResponseType } from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
const instance = (api: "base" | "web" | "i+c") => {

    let baseURL = 'base';
    if (api === 'web') {
        baseURL = API_WEB_URL;
    } else if (api === 'i+c') {
        baseURL = API_IC_URL;
    } else {
        baseURL = API_BASE_URL;
    }

    const instancia = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    instancia.interceptors.request.use(
        (config) => {
            let token = ""
            if (Cookies.get('token')) {
                token = String(Cookies.get('token'));
            }
            if (token) {
                config.headers.Authorization = token ? `Bearer ${token}` : null;
            }
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    );

    instancia.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log("error response::::", error);
            if (error.response && Number(error.response.status) === 401) {
                Cookies.remove('token');
                window.location.href = '/auth';
            } else if (error.code === 'ERR_NETWORK') {
                toast.error('Error de red, verifique su conexión a internet.');
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);

            }
            else {
                console.log(error);
                toast.error('Error inesperado, por favor intente nuevamente.');
            }
            return Promise.reject(error);
        }
    );

    return instancia;
}


const responseBody = (response: AxiosResponse) =>
    response ? response.data : response;

export const fetchApiBase = {
    get: (url: string, responseType?: ResponseType) =>
        instance("base")
            .get(url, {
                responseType,
            })
            .then(responseBody),
    post: (url: string, body?: any) =>
        instance("base").post(url, body).then(responseBody),
    put: (url: string, body?: any) => instance("base").put(url, body).then(responseBody),
    patch: (url: string, body?: any) =>
        instance("base").patch(url, body).then(responseBody),
    delete: (url: string) => instance("base").delete(url).then(responseBody),
};

export const fetchApiWeb = {
    get: (url: string, responseType?: ResponseType) =>
        instance("web")
            .get(url, {
                responseType,
            })
            .then(responseBody),
    post: (url: string, body?: any) =>
        instance("web").post(url, body).then(responseBody),
    put: (url: string, body?: any) => instance("web").put(url, body).then(responseBody),
    patch: (url: string, body?: any) =>
        instance("web").patch(url, body).then(responseBody),
    delete: (url: string) => instance("web").delete(url).then(responseBody),
};

export const fetchApiIC = {
    get: (url: string, responseType?: ResponseType) =>
        instance("i+c")
            .get(url, {
                responseType,
            })
            .then(responseBody),
    post: (url: string, body?: any) =>
        instance("i+c").post(url, body).then(responseBody),
    put: (url: string, body?: any) => instance("i+c").put(url, body).then(responseBody),
    patch: (url: string, body?: any) =>
        instance("i+c").patch(url, body).then(responseBody),
    delete: (url: string) => instance("i+c").delete(url).then(responseBody),
};
