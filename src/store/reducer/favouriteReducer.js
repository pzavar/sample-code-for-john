import { types } from "../actiontypes"

const inititalState = {
    favouriteList: [],
    isLoading: false

}
export const favouriteReducer = (state = inititalState, { type, payload }) => {
    switch (type) {
        case types.ADD_WISHLIST.start || types.GET_WISHLIST.start || types.REMOVE_WISHLIST.start:
            return { ...state, isLoading: true }

        case  types.GET_WISHLIST.success:
            return { ...state, isLoading: false, favouriteList: payload }

        case types.ADD_WISHLIST.success  || types.REMOVE_WISHLIST.success || types.ADD_WISHLIST.failed || types.GET_WISHLIST.failed || types.REMOVE_WISHLIST.failed:
            return { ...state, isLoading: false }

        default:
            return state
    }
}