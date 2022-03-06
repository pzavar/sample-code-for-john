import {types} from '../actiontypes'
import {store} from '../index'
import { setToast } from './index'


export const addToCart=(product, quantity)=>  dispatch =>{
    let cartList =  store.getState().cart.cartList ||[];
    let temp = cartList.slice(0)
    console.log("1111111111111111111111111111111111111111111---------", store.getState().cart.cartList)
    let foundProduct=false
    if( !cartList.length){
  
        let obj ={...product, cartQuantity:1}
       temp.push(obj)
       dispatch({type:types.UPDATE_CART.success, payload:temp})
       dispatch(setToast('success', 'Porduct cart updated'))
       return;
  
    }else{
  
       let foundProduct=false
    
       for (let index = 0; index < cartList.length; index++) {
            const item = cartList[index];
            let id = item.product_id? item.product_id: item.id;
            let compareId= product.product_id? product.product_id: product.id;

            if(item.id=== product.id){
               console.log("item.id === product.id", id=== compareId,{ itemid:item.id, temproductid:item.product_id, productid:product.id, product_productid:product.product_id})
                foundProduct= true
                temp[index].cartQuantity = quantity? quantity :temp[index].cartQuantity+1
                break; 
            }
        }


        if(!foundProduct){
            let obj ={...product, cartQuantity:1}
            temp.push(obj)   
            console.log("temp product if product not fount", temp, foundProduct)
    }
    console.log("temppppppppppppppppppppp", foundProduct, cartList, temp)
    dispatch({type:types.UPDATE_CART.success, payload:temp})
    dispatch(setToast('success', 'Porduct cart updated'))
}

    
   

}
export const removeFromCart = (id) => dispatch=>{
    let cartList = store.getState().cart.cartList||[];
    let temp = cartList.filter(item => item.id !== id)
    // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",temp.length, cartList.length, id)
    dispatch({type:types.UPDATE_CART.success, payload:temp})
    dispatch(setToast('success', 'Porduct remove from cart '))

}

export const clearCartList = (from)=> dispatch => {
    dispatch({type:types.UPDATE_CART.success, payload:[]})
   {from !=='order'&& dispatch(setToast('success', 'All products are removed successfully'))}
}