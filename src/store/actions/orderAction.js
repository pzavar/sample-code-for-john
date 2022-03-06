import { clearCartList } from "."
import { url } from "../../config"
import { types } from "../actiontypes"
import { message } from "../message"
import { authorizedRequestById, authorizedRequest, postData } from "./actionMethod"
import { store } from ".."

export const placeOrder = ( userExist, data, callback) => dispatch=>{
    if(userExist){
        let userAccessKey = {...store.getState().auth.userAccessKey}
        let obj ={...data, customer_id: userAccessKey.id}
        authorizedRequestById(dispatch, url.placeOrder, obj,'noid', types.PLACE_ORDER, message.order.place , ()=>{
            dispatch(clearCartList('order'))
            dispatch(getMyOrders((data)=>callback(data)))
        })
    }else{
        let obj ={...data, customer_id: 0}
        authorizedRequestById(dispatch, url.placeOrder, obj,'noid', types.PLACE_ORDER, message.order.place , ()=>{
            dispatch(clearCartList('order'))
            dispatch(()=>callback())
        })
    }
 
       
} 


export const cancelOrderById = (id, callback) => dispatch=>{
    let data = {
        status:"cancelled"
    }
    authorizedRequestById( dispatch, url.cancelMyOrder, data, id, types.CANCEL_ORDER, message.order.cancel ,()=>{
        dispatch(getMyOrders( (data)=> callback&& callback(data)))
    })
} 

export const getMyOrders = (callback)=> dispatch=>{
    authorizedRequestById(dispatch, url.getMyOrders, null, null, types.GET_MY_ORDERS, null ,callback)
}