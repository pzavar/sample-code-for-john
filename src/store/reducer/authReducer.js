import { types } from "../actiontypes"

const inititalState = {
    isLoading:false,
    phoneVerificationCode: '',
    emailVerificationCode: '',
   userAccessKey:{},
  
}
export const authReducer = (state = inititalState, { type, payload }) => {
    
    switch (type) {
        case 
       ( types.SEND_PHONE_OTP.start || 
        types.FORGET_PASSSWORD.start || 
        types.SEND_EMAIL_OTP.start || 
        types.VERIFY_EMAIL_OTP.start ||
        types.LOGIN.start)  :
            return { ...state, isLoading: true }
        case types.SEND_PHONE_OTP.failed ||
        types.FORGET_PASSSWORD.failed ||
        types.VERIFY_EMAIL_OTP.failed||
        types.SEND_EMAIL_OTP.failed :
        return {...state , isLoading: false}


        case types.LOGIN.success:
            return {...state, isLoading:false, userAccessKey:payload }
        case types.SEND_PHONE_OTP.success:
            return { ...state, isLoading: false, phoneVerificationCode: payload.message }
        case types.SEND_EMAIL_OTP.success:
            return { ...state, isLoading: false, emailVerificationCode: payload.message }
        case types.FORGET_PASSSWORD.success:
            return { ...state, isLoading: false, emailVerificationCode: payload.message, }

        case types.LOGOUT.success:
            return {...state, isLoading:false, userAccessKey:{}}

        case types.VERIFY_PHONE_OTP.success:
            return { ...state, phoneVerificationCode: '' }
        case types.VERIFY_EMAIL_OTP.success:
            return { ...state, emailVerificationCode: '', forgetEmail:'' }

        default:
            return state
    }
}