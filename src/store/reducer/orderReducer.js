import { types } from "../actiontypes"

const inititalState={
   myOrders:[],
   isLoading:false
}
export const orderReducer =(state =inititalState , {type, payload})=>{
    switch(type){
        case types.PLACE_ORDER.start ||
          types.GET_MY_ORDERS.start ||
          types.CANCEL_ORDER.start:
            return {...state, isLoading:true}

        case types.PLACE_ORDER.success ||
         types.PLACE_ORDER.failed ||
         types.GET_MY_ORDERS.failed ||
         types.CANCEL_ORDER.failed ||
         types.CANCEL_ORDER.success:
            return {...state, isLoading:false}

        case types.GET_MY_ORDERS.success:
            return {...state, isLoading:false, myOrders:payload}
        
        default:
            return state
    }
}