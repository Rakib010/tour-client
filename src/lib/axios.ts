import config from '@/config';
import axios, { type AxiosRequestConfig } from 'axios';


export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    // `withCredentials: true` ensures that the browser automatically
    // sends httpOnly cookies (accessToken, refreshToken) with every request.
    // We do NOT manually attach tokens from JS in a cookie-only setup.
    withCredentials: true,
});


/* This code is like putting a security checkpoint at the gate of your API calls:
Before leaving (request) → Attach token, add headers, etc.
Before entering (response) → Handle errors, transform data, log out if needed. */

// Request interceptor
// ------------------------------------------------------------
// In a cookie-only JWT flow:
// - We rely on `withCredentials: true` so the browser sends cookies automatically.
// - We DO NOT read tokens from localStorage nor set Authorization headers from JS.
//   This keeps tokens out of JavaScript space and reduces XSS impact.
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error),
);


// Add a response interceptor
let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });

    pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // console.log("Request failed", error.response.data.message);

        const originalRequest = error.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            console.log("Your token is expired");

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            isRefreshing = true;
            try {
                await axiosInstance.post("/auth/refresh-token");
                //const res = 
               // console.log("New Token arrived", res);

                processQueue(null);

                return axiosInstance(originalRequest);
            } catch (error) {
                processQueue(error);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        //* For Everything
        return Promise.reject(error);
    }
);