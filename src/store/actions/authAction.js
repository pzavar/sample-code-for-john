import  AsyncStorage  from "@react-native-async-storage/async-storage"
import { setToast } from "."
import { httpRequest, url } from "../../config"
import { types } from "../actiontypes"
import { message } from "../message"
import { postData } from "./actionMethod"

export const signup = (data, callback) =>dispatch=>{
    // postData({
    //     dispatch:dispatch,
    //     url:url.signup,
    //     data,
    //     types: types.SIGNUP,
    //     message: message.signup.success,
    //     callback:callback
    // })
    console.log(data)
    postData(dispatch , url.signup, data, null, types.SIGNUP, message.signup.success ,callback)
} 


export const login = (data, callback) => dispatch=>{

    postData(dispatch, url.login, data, null, types.LOGIN, message.login.success ,callback)
} 


export const sendEmailOtp = (data, callback)=>  dispatch =>{

    postData( dispatch, url.sendEmailOtp, data, null, types.SEND_EMAIL_OTP, message.verification.emailSent , callback ,'info')

} 


export const sendPhoneOtp = (data, callback) => dispatch =>{
   postData( dispatch, url.sendPhoneOtp, data, null, types.SEND_PHONE_OTP, message.verification.phoneSent, callback,'info')
} 

export const verifiedPhoneOTP = (callback)=> async dispatch => {

        dispatch(setToast('success', message.verification.phoneConfirm))
        dispatch({type:types.VERIFY_PHONE_OTP.success} )
        callback && callback()
  
}

export const verifiedEmailOTP = (callback)=>async dispatch => {

        dispatch(setToast('success', message.verification.emailConfirm))
        dispatch({type:types.VERIFY_EMAIL_OTP.success})
        callback && callback()
   
}

export const forgetPassword = (data, type, callback) => dispatch=>{
    postData(dispatch,type==='email'? url.forgetPassword: url.sendPhoneOtp , data, null, types.FORGET_PASSSWORD,type==='email'? message.verification.emailSent :message.verification.phoneSent ,callback,'info')
} 

export const resetPassword = (data,callback) => dispatch=>{
    // console.log("reset password data----------------",data)
    postData(dispatch, url.resetPassword, data, null, types.RESET_PASSWORD , message.userUpdate.password,callback)
} 

export const logout =callback=> async dispatch =>{
        dispatch({type:types.LOGOUT.success})
        callback && callback()
}