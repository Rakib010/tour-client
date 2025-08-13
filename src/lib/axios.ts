import config from '@/config';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true
});


/* This code is like putting a security checkpoint at the gate of your API calls:
Before leaving (request) → Attach token, add headers, etc.
Before entering (response) → Handle errors, transform data, log out if needed. */

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //console.log("config", config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log("response", response)
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});