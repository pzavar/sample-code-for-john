import { httpRequest } from "../../config"
import { setToast } from "."
import {store} from '../index';

export const getPublicData= async ( dispatch, url,types,successMsg, callback)=>{
    try {
        
        dispatch({type:types.start})
        let response = await  httpRequest(url)
         response = response.data
         console.log("RES-------", url, typeof response ,response)
        if(response.code && response.code !==200){
            throw response
        }else{

            dispatch({type: types.success, payload:response})
            callback && callback(response)
            successMsg && dispatch(setToast('success',response.message|| successMsg))
        }
        
    } catch (error) {
        console.log("Error: action  getPublicData from url",url, error)
        dispatch({type:types.failed})
        if(error.message.toLowerCase() ==='network error'){
            setToast('error',error.message)
            // getPublicData(dispatch, url,types,successMsg, callback)
        }else{
            error.message && dispatch(setToast('error', error.message))
        }
    }
    
}

export const postData=async (dispatch, url,data, header ,types,successMsg, callback,successNotifyStatus='success')=> {
    try {
    
        if(typeof url !== 'string') return alert (url.toString())
        dispatch({type:types.start})
       console.log("cccccccccccccccccccccccccc",data)
        const response= await httpRequest.post(url,data,header)
        const result= response.data
        let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result
        
        console.log('POST DATA.............................................',result)
        if(result.error) throw result.error
        if( result.result && result.result==='Please enter correct password') throw result.result
        if(result.code && result.code !==200) throw result.message
        else {
            console.log('data',temp)
            
            let data = url==='login'?{...result,username:temp.username }:result
    
            dispatch({type: types.success, payload: data })
            callback && callback(result)
            successMsg && dispatch(setToast(successNotifyStatus,successMsg))   
            
        }
      
        
    } catch (error) {
        console.log("Error from action postData from  url",url, types, error, error.message, typeof error ==='string')
        dispatch({type:types.failed})
        // error.message|| error && 
        dispatch(setToast('error',typeof error ==='string'? error: error.message))
    }
   
    
}

export const authorizedRequest = async (dispatch, url ,data,  types,successMsg, callback,successNotifyStatus='success')=> {
    try {
        console.log(callback)
    
        dispatch({type:types.start})
        // let header = store.getState().authReducer.userAccessKey
        let headers = {...store.getState().auth.userAccessKey}
        delete headers.userid
        let response;
        if(data){
             response= await httpRequest.post(url,data,{headers})
        }else{
            response= await httpRequest.get(url,data,{headers})
        }
        const result= response.data
        console.log("RESPONSE-----------------------------\n", result)

        if(result.error) throw result.error
        else {
            dispatch({type: types.success, payload: result })
            callback && callback(result)
            successMsg && dispatch(setToast(successNotifyStatus,successMsg))             
        }
        
    } catch (error) {
        console.log("Error from authorizedRequest from url",url, error, typeof error ==='string')
        dispatch({type:types.failed})
        // if(error.message === 'Authentication Failed') return;
       ( error.message !== 'Authentication Failed' && error.message)|| error && dispatch(setToast('error',typeof error ==='string'? error: error.message))
    }
    
}

export const authorizedRequestById = async (dispatch, suburl ,data, id=null,  types,successMsg, callback,successNotifyStatus='success')=> {
    
    let response;
    let headers = {...store.getState().auth.userAccessKey}
    let url = id==='noid' ? suburl: id? `${suburl}/${id}`:  `${suburl}/${headers.id}`
    try {
        
        dispatch({type:types.start})
        delete headers.id
        
        if(data){
            console.log("POST authorixed request by id----------------------------",url,data,{headers})
            response= await httpRequest.post(url,data,{headers})
        }else{
            console.log("GET REQUEST authorized request by id ===============", url,{headers})
            response= await httpRequest.get(url,{headers})
        }
        const result= response.data
        
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzcccccccccccc",result)
        if(result.error) throw result.error
        else {
            callback && callback(result)
            dispatch({type:types.success, payload:result})
            successMsg && dispatch(setToast(successNotifyStatus,successMsg))             
        }
        
    } catch (error) {
        console.log("Error from authorizedRequestById from url",url, error, data )
        dispatch({type:types.failed})
        if(error.message.toLowerCase() ==='network error'){
         authorizedRequestById (dispatch, suburl ,data, id=null,  types,successMsg, callback,successNotifyStatus='success')
        }else{
            error.message && dispatch(setToast('error', error.message))
        }
        
        
        // if(error.message === 'Authentication Failed') return;
        // ( error.message !== 'Authentication Failed' && error.message)|| error &&
         dispatch(setToast('error',typeof error ==='string'? error: error.message))
    }
    
}

