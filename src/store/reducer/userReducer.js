import { types } from "../actiontypes"

const inititalState = {
    isLoading: false,
    user: {},
    profile: {},
    address: [],
    cacheAddress:[],
    selectedAddress:'',
    martCode: '',
    isMartAvailable:''
}
export const userReducer = (state = inititalState, { type, payload }) => {
    switch (type) {
        case
            types.GET_PROFILE_BY_ID.start ||
            types.UPDATE_PROFILE_BY_ID.start ||
            types.CONTACT.start ||
            types.GET_USER_ADDRESS.start ||
            types.ADD_USER_ADDRESS.start ||
            types.GET_MART_LOCATION.start :
            return { ...state, isLoading: true }
        case
            types.GET_PROFILE_BY_ID.failed ||
            types.UPDATE_PROFILE_BY_ID.failed ||
            types.CONTACT.failed ||
            types.CONTACT.success ||
            types.GET_USER_ADDRESS.failed ||
            // types.ADD_USER_ADDRESS.failed ||
            types.GET_MART_LOCATION.failed:
            return { ...state, isLoading: false }

        case types.GET_PROFILE_BY_ID.success ||
         types.UPDATE_PROFILE_BY_ID.success:
            let obj = {
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.billing.phone
            }
            return { ...state, isLoading: false, profile: obj }

       
       case  types.GET_USER_ADDRESS.success:
            return { ...state, isLoading: false, adddress: payload }
            case types.ADD_USER_ADDRESS.success :
                return { ...state, isLoading: false, adddress: payload , selectedAddress:payload}

        case types.SELECTED_ADDRESS.success :
            return{...state, selectedAddress:payload}
        
        case types.ADD_LOCAL_ADDRESS.success:
            return{...state,selectedAddress:payload, cacheAddress:[...state.cacheAddress,payload]  }
    
        case types.GET_MART_LOCATION.success:
            let temp=''
            if(!Object.keys(payload).length){ temp='unavailable' }
            return { ...state, isLoading: false, martCode: payload ,isMartAvailable:temp}
            // return { ...state, isLoading: false, martCode:{} ,isMartAvailable:'unavailable'}
        
        case types.LOGIN.success:
            return{...state, cacheAddress:[]}
        
        case types.LOGOUT.success:
            return{...state,
                user: {},
                profile: {},
                address: [],
                selectedAddress:'',
                martCode: '',
                isMartAvailable:''}


        default:
            return state
    }
}