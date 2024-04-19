import { API_BASE_URL, API_WEB_URL } from "@/config";
import { useLoginStore } from "@/states/Login.state";
import axios, { type AxiosResponse, type ResponseType } from 'axios';
import { toast } from "react-toastify";
const instance = (api: "base" | "web") => {
    const instancia = axios.create({
        baseURL: api === "base" ? API_BASE_URL : API_WEB_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    instancia.interceptors.request.use(
        (config) => {
            const { token } = useLoginStore.getState()
            if (token) {
                config.headers.Authorization = token ? `Bearer ${token}` : null;
            }
            return config;
        },
        (error) => {
            const { setToken } = useLoginStore.getState()
            console.log(error);
            if (error.response && Number(error.response.status) === 401) {
                // setToken('');
            }
            return Promise.reject(error);
        }
    );

    instancia.interceptors.response.use(
        (response) => response,
        (error) => {
            const { setToken } = useLoginStore.getState()

            if (error.response && Number(error.response.status) === 401) {
                // setToken('');
            } else if (error.code === 'ERR_NETWORK') {
                toast.error('Error de red, verifique su conexión a internet.');
            }
            else {
                console.log("object");
                toast.error(error.response.data.message);
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
