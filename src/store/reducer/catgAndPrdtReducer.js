import { types } from "../actiontypes"
import { filterCategory } from "../../util"
const inititalState={
   allCategories:[],
   isLoading:false,
   //we will push a obj with the name of parent catg and array of all its sub categories 
   // to search later first in this array if the name not found then we wil hit the api
   subCatgDataforVisitedCatgData:[] ,
   // here we will track the product list for visited sub category data  
   prdtDataForVisitedSubCatg:[],
  

}

export const catgAndPrdtReducer =(state =inititalState , {type, payload})=>{
    switch(type){
        case types.GET_ALL_CATEGORIES.start :
            return{...state, isLoading:true}
        case types.GET_ALL_CATEGORIES.success:
            return {...state ,isLoading:false, allCategories:filterCategory(payload) }
        case types. GET_ALL_CATEGORIES.failed:   case types.GET_ALL_CATEGORIES.start :
            return{...state, isLoading:true}

        case
        //  types.GET_PRODUCT_BY_ID.start || 
        types.SEARCH_PRODUCT.start ||
         types.GET_SUB_CATG.start || GET_PRODUCT_BY_SUBCATG.start  || types.GET_SUB_CATG.start:
            return {...state, isLoading:true}
        case types.GET_PRODUCT_BY_ID.success ||  types.GET_SUB_CATG.success || GET_PRODUCT_BY_SUBCATG.success  || types.GET_SUB_CATG.success:
            return {...state ,isLoading:false }
        case types.SEARCH_PRODUCT.success:
            return {...state, isLoading:false}
            case types.SEARCH_PRODUCT.failed:
                return {...state, isLoading:false}
    
        case types.GET_PRODUCT_BY_ID.failed || types.SEARCH_PRODUCT.failed || types.GET_SUB_CATG.failed || GET_PRODUCT_BY_SUBCATG.failed  || types.GET_SUB_CATG.failed:
            return {...state, isLoading:false}
            

        
        
        default:
            return state
    }
}