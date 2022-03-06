import React, { useState, useEffect } from 'react'
import { ImageBackground, Modal, TouchableHighlight, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/layout/header'
import TextField from '../../components/formFields/textField'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { connect } from 'react-redux'
import { validatePassword ,validateEmail } from '../../util'
import VerificationModal from '../../components/verificationModal'
import { getProfileById, updateCustomerProfile, setToast ,verifiedEmailOTP, verifiedPhoneOTP, sendEmailOtp, sendPhoneOtp } from '../../store/actions';
import { message } from '../../store/message';


const Profile = (props) => {

    const [data, setdata] = useState({})
    const [password, setpassword] = useState('')
    const [email, setEmail] = useState('')
    const [editMode, seteditMode] = useState(false)
    const [showPhoneOTPModal, setshowPhoneOTPModal] = useState(false)
    const [isEmailVerified, setisEmailVerified] = useState(false)
    const [isPhoneVerified, setisPhoneVerified] = useState(false)
    const [showEmailOTPModal, setshowEmailOTPModal] = useState(false)
  
    const { profile } = props;
    const handleChange = (val, name) => {
        let temp = Object.assign({}, data)
        temp[name] = val
        setdata(temp)
    }
    useEffect(() => {
        if (!Object.keys(profile).length) {
            props.getProfileById()
        } else {
            setdata(profile)
            console.log(profile)
        }

    }, [Object.keys(profile).length])

    const handleSendEmailOtp = () => {
        console.log('runnnn')
        props.sendEmailOtp({email}, () => setshowEmailOTPModal(true))
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
        console.log(data.phone, val)
        
        if(!data.phone ||( data.phone !=='' && data.phone.length<8)) throw 'Invalid phone number'
        props.sendPhoneOtp({phone :data.phone}, () => setshowPhoneOTPModal(true))   
    
      } catch (error) {
         props.setToast('error', error.message || error)
      }
    }
    
    const verifyPhoneOtp = (val) => {
        let decryptVal = (Number(props.phoneVerificationCode)-10)/2
        console.log(Number(val)=== Number(decryptVal) ,val, decryptVal)
        if(Number(val)=== decryptVal){
                props.verifiedPhoneOTP(()=>{
                    setshowPhoneOTPModal(false)
                    setisPhoneVerified(true)
                })
        }else{
            props.setToast('erorr', message.verification.error)
        }
    }
    


    const handleSubmit = () => {
        
        try {
          
            if(!data.first_name) throw 'First Name Is Required'
            if(!data.last_name) throw 'Last Name is Required'
            if(password && !validatePassword(password)) throw message.password.error
           let obj={
               first_name:data.first_name,
               last_name:data.last_name,
              
           }
             !props.profile.email && data.email &&(obj.email= data.email)
             !props.profile.phone && data.phone && (obj.phone=data.phone)
             password&& validatePassword(password) && (obj.password=password)
             console.log(obj)

            //  props.updateCustomerProfile(obj, () => props.navigation.navigate('home'))
             
             
            props.updateCustomerProfile(obj,()=>{
                password? props.logout(()=>props.navigation.navigate('login'))
                        : props.navigation.navigate('home')
            })
            
              

        } catch (error) {
            props.setToast('error', error)
        }

       

       
    }
    return (
        <View style={styles.container}>
            <View style={{ width: wp(100) }}>
                {/* <Header /> */}
                <View style={[styles.header]}>
                <TouchableOpacity onPress={() => {
                    editMode? seteditMode(false): props.navigation.goBack()
                   }}>
                    <View style={{flexDirection:'row'}}>
                    <ICONS.AntDesign name={'arrowleft'} size={22} color={COLORS.tomato} />
                    {/* <Text style={{fontSize:14, fontFamily:'Poppins-Medium'}}>  Back</Text> */}
                    </View>
                </TouchableOpacity>   

                <Text style={styles.h1}>{editMode?'Edit Profile': 'Profile Details'}</Text>

                <TouchableOpacity onPress={()=>seteditMode(!editMode) }>
                        <ICONS.Feather name={'edit'} size={22} color={COLORS.green} />
                    </TouchableOpacity>       
                </View>
               
            </View>
            <View>
                <TextField
                    label={'First Name'}
                    value={data.first_name}
                    editable={editMode}
                    onTermChange={(val) => handleChange(val, 'first_name')} />

                <TextField
                    label={'Last Name'}
                    editable={editMode}
                    value={data.last_name}
                    onTermChange={(val) => handleChange(val, 'last_name')} />

                {/* <TextField
                    label={'Email'}
                    value={data.email}
                    editable={props.profile.email? false:editMode}
                    placeholder={'Enter Email'}
                    onTermChange={(val) => handleChange(val,'email')}
                />

                <TextField
                    label={'Phone No'}
                    value={data.phone}
                    editable={props.profile.phone? false:editMode}
                    placeholder={'Enter Phone No'}
                    onTermChange={(val) => handleChange(val,'phone')}
                /> */}

                <View style={styles.row}>
                  <TextField
                    label={'Email'}
                    style={[styles.input]}
                    placeholder={'Enter Email'}
                    value={data.email}
                    labelStyle={styles.label}
                    editable={props.profile.email? false:editMode}
                    onTermChange={val => handleChange(val, 'email')}
                  />
                  {Boolean(profile.email)===false && !!data.email && validateEmail(data.email) &&  !isEmailVerified && <TouchableHighlight
                  underlayColor={COLORS.tomato}
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
                    value={data.phone}
                    
                    editable={props.profile.phone? false:editMode}
                    onTermChange={val =>   handleChange(val, 'phone')}
                  />
               
                { Boolean(profile.phone)==false && !!data.phone && data.phone.length>8 && !isPhoneVerified  &&
                <TouchableHighlight

                    underlayColor={COLORS.tomato}
                    style={[styles.sideBtn, { marginLeft: -wp(28), marginBottom:20 }]}
                    onPress={() =>handleSendPhoneOtp(data.phone)}>
                    <Text style={styles.sideBtnText}>Send OTP</Text>
                  </TouchableHighlight>
                  }
                </View>

                  <TextField
                    label={'password'}
                    value={password}
                    placeholder={'Update Password Here'}
                  editable={editMode}
                    secureText={true}

                    onTermChange={(val) => { setpassword(val)}}
                />
                {editMode &&<Text style={{color:COLORS.lightGray, fontSize:12,
                    width:wp(90),
                    marginTop:5,
                    fontFamily:'Poppins-Regular'}}>{message.password.desc}</Text>}

                {editMode &&
                    <TouchableHighlight underlayColor={COLORS.tomato} onPress={() => handleSubmit()}
                        style={[styles.btn, { backgroundColor: COLORS.green, width: wp(85) }]}>
                        <Text style={[styles.btnText, { color: COLORS.white }]}>SAVE</Text>
                    </TouchableHighlight>}



            </View>
            <Modal animationType='slide' transparent  visible={showPhoneOTPModal}>
      <VerificationModal
          onResend={() => handleSendPhoneOtp()}
          onVerify={val => verifyPhoneOtp(val)}
          isVisible={showPhoneOTPModal}
          from={'phone'}
          goBack={() => {
            // setshowOrderSummary(false)
            setshowPhoneOTPModal(false)}} 
          />
      </Modal>
      {/* // :
 
        // showEmailOTPModal?  */}
        <Modal  animationType='slide'  visible={showEmailOTPModal}>
      <VerificationModal
       transparent
        onResend={() => handleSendEmailOtp()}
        onVerify={val => verifyEmailOtp(val)}
        isVisible={showEmailOTPModal}
       
        goBack={() => setshowEmailOTPModal(false)} />
        </Modal>
        </View>
    )
}

const mapStateToProps = props => {
    return {
        profile: props.user.profile,
        emailVerificationCode: props.auth.emailVerificationCode,
        phoneVerificationCode:props.auth.phoneVerificationCode,
    }
}
export default connect(mapStateToProps, { getProfileById, updateCustomerProfile, setToast ,verifiedEmailOTP, verifiedPhoneOTP, sendEmailOtp, sendPhoneOtp  })(Profile)

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        flex: 1
    },
    btn: {
        width: "95%",
        borderColor: COLORS.green,
        borderWidth: 2,
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: '5%',
        alignSelf: "center",
    },
    btnText: {
        color: COLORS.green,
        ...getFont("OpenSans_m_17"),
        textTransform: "uppercase",
    },
    title: {
        ...getFont('Poppins_m_22'),

        // textAlign: 'center',
        color: COLORS.green,
        // marginTop: - hp(1),
        // marginLeft: '8%',
        //
    },
    h1:{
        ...getFont('Poppins_m_18'),
        // fontWeight:'bold',
        // paddingTop:'6%',
        paddingLeft:25,
        textAlign:'center',
        paddingBottom:0,
        letterSpacing:0.4,
        color:COLORS.green
    

      },
      header:{
        width:wp(100),
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
       height:60,
    
       borderBottomWidth:1,
        borderBottomColor:COLORS.light2,      
       backgroundColor:'white',
       justifyContent:'space-between'
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
    
})
