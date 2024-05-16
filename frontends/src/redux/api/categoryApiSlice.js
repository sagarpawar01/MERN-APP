import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createCategory : builder.mutation({
            query : (newCategory) => ({
                url : `${CATEGORY_URL}`,
                method : "POST",
                body : newCategory
            })
        }),
        fetchCategories : builder.query({
            query : () => ({
                url : `${CATEGORY_URL}/categories`
            }),
            // providesTags : ["User"],
            // keepUnusedDataFor : 5
        }),
        deleteCategory : builder.mutation({
            query : (categoryId) => ({
                url : `${CATEGORY_URL}/${categoryId}`,
                method : "DELETE"
            })
        }),
        getCategory : builder.query({
            query : (categoryId) => ({
                url : `${CATEGORY_URL}/${categoryId}`
            }),
            // keepUnusedDataFor : 5
        }),
        updateCategory : builder.mutation({
            query : ({categoryId, updateCategory}) => ({
                url : `${CATEGORY_URL}/${categoryId}`,
                method : "PUT",
                body : updateCategory
            }),
            // invalidatesTags : ["User"]
        })
    })
})

export const { useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, useGetCategoryQuery, useUpdateCategoryMutation } = categoryApiSlice