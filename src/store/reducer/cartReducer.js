import { types } from "../actiontypes"

const inititalState = {
    cartList: [],
    isLoading:false

}
export const cartReducer = (state = inititalState, { type, payload }) => {
    switch (type) {
        case types.UPDATE_CART.start:
            return { ...state, isLoading: true }
        case types.UPDATE_CART.success:
            return { ...state, isLoading: false ,cartList:payload }
        case types.UPDATE_CART.failed:
            return { ...state, isLoading: false }


        default:
            return state
    }
}