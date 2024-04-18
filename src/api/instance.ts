import { API_URL } from '@/config';
import axios, { type AxiosResponse, type ResponseType } from 'axios';
import Cookies from "js-cookie";

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
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = token ? `Bearer ${token}` : null;
        }
        return config;
    },
    (error) => {
        if (error.response && Number(error.response.status) === 401) {
            Cookies.remove('token');
        }
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && Number(error.response.status) === 401) {
            Cookies.remove('token');
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