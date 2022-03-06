import {  url } from "../../config"
import { types } from "../actiontypes"
import { getPublicData } from "./actionMethod"


export const getBrands = ()=> dispatch=>{
    getPublicData(dispatch, url.getBrands, types.GET_BRANDS)
}

export const getFeaturedProducts = (martcode)=> dispatch=>{
    let suburl = `${url.getFeaturedProducts}/${martcode?martcode:0}`
    getPublicData(dispatch, suburl, types.GET_FEATURED_PRODUCT)
}

export const getSpecialProduct = ()=>   dispatch=>{
    getPublicData(dispatch, url.getSpecialProduct, types.GET_SPECIAL_PRODUCT) 
}

export const getBestSeller =(martcode)=>  dispatch=>{
  
    let suburl = `${url.getBestSeller}/${martcode?martcode:0}`
    getPublicData(dispatch, suburl, types.GET_BEST_SELLER)
}

export const getHomeSlider=()=> dispatch=>{
    getPublicData(dispatch, url.getHomeSlider, types.GET_GET_HOME_SLIDER)
}

export const getShowCaseCategory=()=> dispatch=>{
    getPublicData(dispatch, url.getShowCaseCategory, types.GET_SHOWCASE_CATG)
}


export const getHomePageCatg =()=>dispatch=> {
    console.log(url.getHomePageCategories , types.GET_HOME_PAGE_CATG)
    getPublicData(dispatch, url.getHomePageCategories , types.GET_HOME_PAGE_CATG)
}
