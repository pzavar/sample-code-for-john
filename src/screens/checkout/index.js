import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Modal,
  Keyboard
} from 'react-native';
import { COLORS, getFont, wp, hp, ICONS, IMAGES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import TextField from '../../components/formFields/textField';
import VerificationModal from '../../components/verificationModal'
import { connect } from 'react-redux'
import OrderDetails from './orderDetails';
import { validateEmail } from '../../util';
import { setToast, placeOrder,verifiedEmailOTP, verifiedPhoneOTP, sendEmailOtp, sendPhoneOtp } from '../../store/actions';
import { message } from '../../store/message';

const CheckOut = props => {
  const navigation = useNavigation();
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setphone] = useState('');
  const [phoneOTP, setphoneOTP] = useState('');
  const [email, setemail] = useState('');
  const [emailOTP, setemailOTP] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [showOrderSummary, setshowOrderSummary] = useState(false)
  const [additionalNote, setadditionalNote] = useState('')
  const [total, settotal] = useState(0)
  const [data, setdata] = useState({})
  const [showPhoneOTPModal, setshowPhoneOTPModal] = useState(false)
  const [isEmailVerified, setisEmailVerified] = useState(false)
  const [isPhoneVerified, setisPhoneVerified] = useState(false)
  const [showEmailOTPModal, setshowEmailOTPModal] = useState(false)

  const {profile , selectedAddress}=props
  useEffect(() => {
    if(props.userAccessKey){
      if(Object.keys(profile).length){
        // alert(JSON.stringify(profile))
        setemail(profile.email)
        setfname(profile.first_name)
        setlname(profile.last_name)
        setphone(profile.phone)
          // setdata(props.profile)
      }
    }
    if(selectedAddress){
      setAddress(selectedAddress.address)
    }

    if (props.cartList.length) {

      let totalPrice = 0
      for (const item of props.cartList) {
          let price = item.sales_price ? item.sales_price : item.regular_price ? item.regular_price : 0
          let subtotal = price * Number(item.cartQuantity)
          totalPrice = Number(totalPrice) + Number(subtotal)
          // console.log(price, subtotal, totalPrice)
      }
      settotal(totalPrice)
  }
   

    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     setKeyboardVisible(true); // or some other action
    //   }
    // );
    // const keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   () => {
    //     setKeyboardVisible(false); // or some other action
    //   }
    // );

    return () => {
      // keyboardDidHideListener.remove();
      // keyboardDidShowListener.remove();
    };
  }, [props.userAccessKey, props.profile, props.selectedAddress
    // isKeyboardVisible
  ])

  const handleOrderDetails=()=>{
      try {
        if(!fname) throw 'First name is required'
        if(!lname) throw 'Last name is required'
        if(!profile.phone && !phone && !profile.email  && !email) throw 'Email is required'
        if(!profile.email && email && !validateEmail(email) ) throw 'invalid Email'
        if( !profile.email && email && validateEmail(email) && !isEmailVerified) throw 'Verify Email address'
        if(!profile.email&& !email && !profile.phone  && !phone) throw 'Phone number is required'
        if(!profile.email && !email && !profile.phone && phone && !isPhoneVerified) throw 'verify Phone Number'
        if(!address) throw 'Delivery address is required'
      
        if(!props.martCode) throw 'No shop Available currently in your area'
       
        let obj={
          first_name:fname,
          last_name:lname,
          email:email,
          phone:phone,
          // additional_note:additionalNote,
          shop_code: props.martCode.mart_code,
          delivery_location :address,
          customer_note:additionalNote
        }
        // console.log(obj)
        setdata(obj)
        setshowOrderSummary(true)
        
        
      } catch (error) {
        props.setToast('error', typeof error==='string'? error: error.message)
      }

  }

  const handleCreateOrder= (cartList,total)=>{
    try {
        if(!cartList.length) throw 'Cart is empty'
        let orderList = []

        if(cartList.length){
            for (const item of cartList) {
              let orderItem = {
                product_id: item.id,
                quantity:item.cartQuantity
              }
              orderList.push(orderItem)
            }
        }
        let obj ={...data, line:orderList }
        let userExist= Object.keys(props.userAccessKey).length>0?true:false
        props.placeOrder( userExist,  obj, ()=>{
          settotal(0)
          props.navigation.navigate('home')})
    } catch (error) {
      props.setToast('error', typeof error==='string'? error: error.message) 
    }
   
  
  }


 

const handleSendEmailOtp = () => {
    // console.log('runnnn')
    setshowEmailOTPModal(true)
    props.sendEmailOtp({email})
}

const verifyEmailOtp = (val) => {
    let decryptVal = (Number(props.emailVerificationCode)-10)/2
  
    if(Number(val)=== decryptVal){
            props.verifiedEmailOTP(()=>{
                setshowEmailOTPModal(false)
                setisEmailVerified(true)
            })
    }else{
        setToast('erorr', message.verification.error)
    }
}

const handleSendPhoneOtp = (val) => {
  try {
    // console.log(phone, val)
    
    if(!phone ||( phone !=='' && phone.length<8)) throw 'Invalid phone number'
    setshowPhoneOTPModal(true)
    props.sendPhoneOtp({phone})   

  } catch (error) {
     props.setToast('error', error.message || error)
  }
}

const verifyPhoneOtp = (val) => {
    let decryptVal = (Number(props.phoneVerificationCode)-10)/2
    // console.log(Number(val)=== Number(decryptVal) ,val, decryptVal)
    if(Number(val)=== decryptVal){
            props.verifiedPhoneOTP(()=>{
                setshowPhoneOTPModal(false)
                setisPhoneVerified(true)
            })
    }else{
        props.setToast('erorr', message.verification.error)
    }
}

// console.log(phone, data)
  const CheckOutForm=()=>(
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
     
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.formSection}>
              
               
                  <TextField
                    label={'First name'}
                    // required={true}
                    labelStyle={styles.label}
                    style={[styles.input]}
                    placeholder={'Enter First Name'}
                    value={fname}
                    editable={profile.first_name ?false:true}
                    onTermChange={val => setfname(val)}
                  />

                  <TextField
                    label={'Last name'}
                    // required={true}
                    labelStyle={styles.label}
                    style={[styles.input]}
                    placeholder={'Enter Last Name'}
                    value={lname}
                    editable={profile.last_name? false: true}
                    onTermChange={val => setlname(val)}
                  />
            


             

                <View style={styles.row}>
                  <TextField
                    label={'Email'}
                    // optional={true}
                    style={[styles.input]}
                    placeholder={'Enter Email'}
                    value={email}
                    labelStyle={styles.label}
                    editable={profile.email?false:true}
                    onTermChange={val => setemail(val)}
                  />
                  {Boolean(profile.email)===false && !!email && validateEmail(email) &&  !isEmailVerified && <TouchableHighlight
                  // style={{marginLeft:-100}}
                   style={[styles.sideBtn, { marginLeft: -wp(28), marginBottom:20 }]}

                    onPress={() => handleSendEmailOtp()}>
                    <Text style={styles.sideBtnText}>Send OTP</Text>
                  </TouchableHighlight>}
                </View>
                <View style={styles.row}>
                  <TextField
                    label={'Phone'}
                    labelStyle={styles.label}
                    style={[styles.input]}
                    keyboardType={'phone-pad'}
                    placeholder={'Enter Phone Number'}
                    value={phone}
                    
                    editable={profile.phone? false: true}
                    onTermChange={val =>  setphone(val)}
                  />
                {
                Boolean(profile.phone)==false && !!phone &&phone.length>8 && !isPhoneVerified  &&
                //  !!phone &&phone.length>=8 &&  
                <TouchableHighlight
                underlayColor={COLORS.tomato}
                  // style={{marginLeft:-100}}
                   style={[styles.sideBtn, { marginLeft: -wp(28), marginBottom:20 }]}
                    onPress={() =>handleSendPhoneOtp(phone)
                      // setshowPhoneOTPModal(true)
                      // setshowOrderSummary(false)
                      }>
                    <Text style={styles.sideBtnText}>Send OTP</Text>
                  </TouchableHighlight>
                  }
                </View>

                <TextField
                label={'Delivery Address'}
                // required={true}
                multiline={true}
                style={[styles.input,{height:'auto'}]}
                placeholder={'Enter Delivery Address'}
                value={address}
                labelStyle={[styles.label,{marginTop:-15}]}
                onTermChange={val => setAddress(val)}
                // editable={selectedAddress? false:true}
              />
              <TextField
                  label={'Payment Method'}
                  //   required={true}
                  //   labelStyle={{marginLeft: '2%'}}
                  style={[styles.input]}
                  // placeholder={'Additional notes'}
                  labelStyle={[styles.label]}
                  value={'Cash on delivery'}
                  // multiline={true}
                  editable={false}
                  onTermChange={val => setadditionalNote(val)}
                />
              <TextField
                  label={'Add Additional Notes'}
                  //   required={true}
                  //   labelStyle={{marginLeft: '2%'}}
                  style={[styles.input, { height:'auto', maxHeight:hp(10), marginBottom:hp(10) }]}
                  placeholder={'Additional notes'}
                  labelStyle={[styles.label]}
                  value={additionalNote}
                  multiline={true}
                  onTermChange={val => setadditionalNote(val)}
                />
               
              </View>

          </ScrollView>
      </View>
  )
  return (
    <>
     {!showPhoneOTPModal && !showEmailOTPModal && <View style={[styles.header]}>
        <TouchableOpacity
          style={{ position: 'absolute', left: '5%' }}
          onPress={() => showOrderSummary? setshowOrderSummary(false): navigation.goBack()}>
          <ICONS.AntDesign name={'arrowleft'} size={20} color={COLORS.tomato} />
        </TouchableOpacity>

        {/* <Text style={styles.h1}>Checkout</Text> */}
        <Text style={[{marginTop:15},styles.h2]}>{ showOrderSummary?'Order Summary': 'Billing Details'}</Text>

    {!showOrderSummary &&    <TouchableOpacity
          style={{ position: 'absolute', right: '5%' }}
          onPress={() => {
            handleOrderDetails()
           
            }}>
            <Text style={{color:COLORS.tomato, fontFamily:'Poppins-Medium', fontSize:15, marginTop:5}}>Next</Text>
          {/* <ICONS.AntDesign name={'arrowleft'} size={20} color={COLORS.tomato} /> */}
        </TouchableOpacity>}

      </View>}
      {!!showOrderSummary? 
      <OrderDetails handleCreateOrder={(cartList, total)=>  handleCreateOrder(cartList, total)} /> : 
    
  
      showEmailOTPModal?
      <VerificationModal
       transparent
        onResend={() => handleSendEmailOtp()}
        onVerify={val => verifyEmailOtp(val)}
        isVisible={showEmailOTPModal}   
        goBack={() => setshowEmailOTPModal(false)} />:
        showPhoneOTPModal ?
        <VerificationModal
        onResend={() => handleSendPhoneOtp()}
        onVerify={val => verifyPhoneOtp(val)}
        isVisible={showPhoneOTPModal}
        from={'phone'}
        goBack={() => {
          setshowOrderSummary(false)
          setshowPhoneOTPModal(false)}} 
        />:  CheckOutForm()
        }
        {/* </Modal> */}
       {/* } */}
      
      
    </>
  )
}
const mapStateToProps=props=>{
  return{
    userAccessKey:props.auth.userAccessKey,
    profile:props.user.profile,
    selectedAddress:props.user.selectedAddress,
    martCode:props.user.martCode,
    isLoading: props.user.isLoading,
    cartList: props.cart.cartList,
    emailVerificationCode: props.auth.emailVerificationCode,
    phoneVerificationCode:props.auth.phoneVerificationCode,
  }
}

export default  connect(mapStateToProps, {setToast, placeOrder,verifiedEmailOTP, verifiedPhoneOTP, sendEmailOtp, sendPhoneOtp})( CheckOut)

const styles = StyleSheet.create({
  label:{
    paddingLeft:0,
    // marginLeft:-10
  },
  h1: {
    ...getFont('OpenSans_m_20'),
    textAlign: 'center',
    paddingBottom: 0,
    letterSpacing: 0.4,
  },
  header: {
    width: wp(100),
    alignItems: 'center',
    // paddingHorizontal:10,
    flexDirection: 'row',
    height: 60,
    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light2,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
    //    justifyContent:'space-between'
  },
  formSection: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingTop: '4%',
    //   paddingBottom: '20%',
    //   height:hp(200)
  },
  input: {
    borderWidth: 0,
    height: 45,
    width: wp(90),
    paddingLeft:0,
    marginBottom: '3%',
  },
  sideBtn: {
    width: wp(28),
    backgroundColor: COLORS.green,
    height: 40,
    marginLeft: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: '2%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '3%',
    width: wp(90),
    marginTop:-5,
  },
  sideBtnText: { color: COLORS.white, ...getFont('Poppins_m_14') },

  btnText2: {
    color: COLORS.white,
    width: 100,
    borderRadius: 10,
    // height:wp(10),
    textAlign: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //  marginRight:wp(20),
    backgroundColor: COLORS.green
  },
  nextBtn: {
    color: COLORS.white,
    width: 100,
    borderRadius: 10,
    // height:wp(10),
    textAlign: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //  marginLeft:wp(90),
    backgroundColor: COLORS.green
  },
  h2: {
    color: COLORS.green,
    alignSelf: 'flex-start',
    paddingBottom: '4%',
    paddingLeft: '4%',
    ...getFont('Poppins_m_20')
  },
  cell: {
    borderWidth: 0.5,

    borderColor: COLORS.gray2,
    flex: 1,
    width: '50%',
    height: 40,
    padding: '2%'
  },
  th: {
    ...getFont('OpenSans_m_16')
  },
  td: {
    textTransform: 'capitalize',
    ...getFont('OpenSans_r_16')

  },
  link: {
    color: COLORS.tomato,
    textDecorationLine: 'underline',
    ...getFont('OpenSans_r_16')
  }
});

