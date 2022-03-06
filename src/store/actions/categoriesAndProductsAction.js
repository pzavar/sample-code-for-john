import { url } from "../../config"
import { types } from "../actiontypes"
import { getPublicData } from "./actionMethod"
import { store } from ".."
export const getAllCategories = ()=> dispatch=>  {
    getPublicData(dispatch, url.getHomePageCategories, types.GET_ALL_CATEGORIES) 
}

export const getSubCatg =(id, callback)=> dispatch=> {
   
    getPublicData(dispatch, url.getAllCategoriesByParentId+'/'+id, types.GET_SUB_CATG, null , callback)
}

export const getProductListByCatgId=(id, callback)=> dispatch=>{
    let martcode = {...store.getState().user.martCode}
   
    if(martcode && martcode.mart_code){
        console.log(martcode)
        getPublicData(dispatch, url.getProductByCatgIDAndMartCode+'/'+id+'/'+martcode.mart_code, types.GET_PRODUCT_BY_SUBCATG, null, callback)

    }else{
        getPublicData(dispatch, url.getProductByCatgId+'/'+id, types.GET_PRODUCT_BY_SUBCATG, null, callback)

    }
}


export const getProductById=(id, callback)=> dispatch=>{
    getPublicData(dispatch, url.getProductById+'/'+id, types.GET_PRODUCT_BY_ID,null, callback)
}

export const getRelatedProduct=(id, callback)=> dispatch=>{
    getPublicData(dispatch, `${url.getProductByMultipleId}/${id.toString()}`, types.GET_PRODUCT_BY_ID,null, callback)
}

export const searchProductByName=(data, callback)=> dispatch=>{
    let martcode = {...store.getState().user.martCode}
   
    if(martcode && martcode.mart_code){
        console.log(martcode)
        getPublicData(dispatch,`${url.searchProduct}/${data}/${martCode.mart_code}`, types.SEARCH_PRODUCT, null, callback)
    }else{
        getPublicData(dispatch,`${url.searchProduct}/${data}`, types.SEARCH_PRODUCT, null, callback)

    }
   
}