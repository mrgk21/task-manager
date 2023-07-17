import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/v1",
});

const baseQueryWRetry = retry(baseQuery, { maxRetries: 3 });

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWRetry,
	tagTypes: ["Task"],
	endpoints: () => ({}),
});
