import { addressLocationKey, url } from '../../config';
import { types } from '../actiontypes';
import {  authorizedRequestById, getPublicData, postData } from './actionMethod';
import { message } from "../message"
import axios from 'axios';
import { clearCartList, getBestSeller, getFeaturedProducts, setToast } from '.';
import {store} from '../index';



// ===================== PROFILE ==================== //

export const getProfileById =()=> dispatch=> { 
    authorizedRequestById(dispatch, url.getProfileById , null, null, types.GET_PROFILE_BY_ID, null ,null)
}

export const updateCustomerProfile =(data, callback)=> dispatch=> {
    authorizedRequestById(dispatch, url.updateCustomerById , data, null, types.UPDATE_PROFILE_BY_ID , message.userUpdate.profile ,()=>{
        dispatch(getProfileById(()=>callback()))
        
    })
}

// ===================== ADDRESSS ==================== //


export const getCustomerAddress =(callback)=> dispatch=> {
    authorizedRequestById(dispatch, url.getCustomerAddress , null, null, types.GET_USER_ADDRESS , null ,callback)
}


export const getAddressFromCords =(data, callback)=> async dispatch=>{
    let _url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude||data.lat},${data.longitude ||data.lng}&key=${addressLocationKey}`
    try {
      
        dispatch({type:types.GET_ADDRESS_FROM_CORDS.start})
        let response = await  axios.get(_url)
         response = response.data
        if(response.code && response.code !==200){
            throw response
        }else{
            dispatch({type: types.GET_ADDRESS_FROM_CORDS.success , payload:response})
            callback && callback(response)
        }
        
    } catch (error) {
        console.log("Error from user action getAddressFromCords",_url, error)
        dispatch({type:types.GET_ADDRESS_FROM_CORDS.failed})
        error.message && dispatch(setToast('error', error.message))
    }
    // getPublicData(dispatch, url,  types.GET_ADDRESS_FROM_CORDS ,null, callback)
}


export const getMartCode = (data, callback) => dispatch=> {

  console.log("DATA Input for martcode", data)
    postData( dispatch,url.getMartCodeByLocation , data, null, types.GET_MART_LOCATION, null ,(data)=>{
            // ============== update best seller and featured product if martcode change =================== //
        if(data.mart_code){
            console.log("getMartCode getMartCode  getMartCode getMartCode getMartCode getMartCode getMartCode getMartCode ",data)
            dispatch(getBestSeller(data.mart_code))
            dispatch(getFeaturedProducts(data.mart_code))
            dispatch(clearCartList('order'))
            callback(data)
        }
    })
} 

export const addNewAddress =(data, callback)=> dispatch=> {

    let userAccessKey = {...store.getState().auth.userAccessKey}
    if(userAccessKey.id){

        authorizedRequestById(dispatch, url.addNewAddress , data, 'noid', types.ADD_USER_ADDRESS , message.userUpdate.address ,()=>{
           dispatch( getCustomerAddress(()=>callback()))
        })
    }else{
        console.log("add local address ------------------",data)
        dispatch({type:types.ADD_LOCAL_ADDRESS.success, payload: data})
        callback&& callback()
    }
}

export const selectedAddress=(data)=> dispatch=>{
    dispatch({type:types.SELECTED_ADDRESS.success, payload:data})
}


// ===================== CONTACT ==================== //
export const postContact = (data, callback) => dispatch=> {
    
    postData( dispatch,url.contactUs , data, null, types.CONTACT, message.contact.success ,callback)
} 
