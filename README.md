How They Work Together (Flow) --> 
Component calls hook → e.g., useLoginMutation().
Hook calls RTK Query with:
url, method, data (from authApi).
RTK Query passes this request to axiosBaseQuery.
axiosBaseQuery calls axiosInstance.
Request Interceptor runs before sending:
Can add tokens or modify headers.
Axios sends request to backend (config.baseUrl + url).
Backend responds.
Response Interceptor runs before the data reaches axiosBaseQuery.
axiosBaseQuery formats { data: ... } or { error: ... } for RTK Query.
RTK Query stores the result in Redux store (baseApi.reducerPath).
Component automatically gets data, isLoading, isError values.


1. Axios + RTK,redux (api) , statemanagement, js, react route, shandcn 
