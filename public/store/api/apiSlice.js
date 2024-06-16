// https://jsonplaceholder.typicode.com/posts
import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const postsApi = CreateApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    /** 設定 API 的基礎 URL，不包括方法名 () */
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
        /** @query 函數的返回值會用於發送請求，此處為 GET /posts */
      query: () => "posts",
    }),
  }),
});
