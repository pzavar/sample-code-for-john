import { url } from "../../config"
import { types } from "../actiontypes"
import { message } from "../message"
import { postData ,authorizedRequestById} from "./actionMethod"

export const addtoWishlist = (data, callback)=>dispatch =>{
    
    authorizedRequestById(dispatch, url.addtoWishlisht, data, null, types.ADD_WISHLIST, message.wishlist.add ,()=>{
        dispatch(getAllWishlist((data)=>callback(data)))
    })
} 


export const deleteWishListById = (id, callback) => dispatch =>{
    authorizedRequestById(dispatch, url.deleteWishListById, null, id, types.REMOVE_WISHLIST, message.wishlist.remove ,()=>{
        dispatch(getAllWishlist((data)=>{
            console.log("delete wishlist get data--------------------", data)
            callback(data)}))
    })
} 

export const getAllWishlist = (callback)=> dispatch =>{
    authorizedRequestById(dispatch, url.getAllWishlist, null, null, types.GET_WISHLIST,null, callback)
}