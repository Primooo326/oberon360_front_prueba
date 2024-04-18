import { API_URL } from "@/config";
import { useLoginStore } from "@/states/Login.state";
import axios, { type AxiosResponse, type ResponseType } from 'axios';
import { toast } from "react-toastify";
const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    responseType: 'json' as ResponseType,
});

instance.interceptors.request.use(
    (config) => {
        const { token } = useLoginStore.getState()
        console.log(token);
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

instance.interceptors.response.use(
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

const responseBody = (response: AxiosResponse) =>
    response ? response.data : response;

const fetch = {
    get: (url: string, responseType?: ResponseType) =>
        instance
            .get(url, {
                responseType,
            })
            .then(responseBody),
    post: (url: string, body?: any) =>
        instance.post(url, body).then(responseBody),
    put: (url: string, body?: any) => instance.put(url, body).then(responseBody),
    patch: (url: string, body?: any) =>
        instance.patch(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export default fetch;