import { ORDER_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query : (newOrder) => ({
                url : `${ORDER_URL}`,
                method : "POST",
                body : newOrder
            })
        }),
        getOrderDetails : builder.query({
            query : (id) => ({
                url : `${ORDER_URL}/${id}`,
                method : "GET"
            })
        }),
        getOrders : builder.query({
            query : () => ({
                url : ORDER_URL
            })
        }),
        payOrder : builder.mutation({
            query : ({orderId, details}) => ({
                url : `${ORDER_URL}/${orderId}/pay`,
                method : "PUT",
                body : details
            })
        }),
        getPaypalClientId : builder.query({
            query : ({orderId, details}) => ({
                url : `${PAYPAL_URL}`,
                method : "GET"
            })
        }),
        getMyOrders : builder.query({
            query : () => ({
                url : `${ORDER_URL}/mine`,
                method : "GET"
            }),
            keepUnusedDataFor : 5
        }),
        deliverOrder : builder.mutation({
            query : (orderId) => ({
                url : `${ORDER_URL}/${orderId}/deliver`,
                method : "PUT"
            })
        }),
        getTotalOrders : builder.query({
            query : () => ({
                url : `${ORDER_URL}/total-orders`
            })
        }),
        getTotalSales : builder.query({
            query : () => ({
                url : `${ORDER_URL}/total-sales`
            })
        }),
        getTotalSalesByDate : builder.query({
            query : () => ({
                url : `${ORDER_URL}/total-sales-by-date`
            })
        })
    })
})

export const { useCreateOrderMutation, useDeliverOrderMutation, useGetMyOrdersQuery, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery, useGetOrdersQuery, usePayOrderMutation } = orderApiSlice