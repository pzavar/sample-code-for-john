import React, { useState, useEffect } from 'react'
import { ImageBackground, BackHandler, TouchableHighlight, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/layout/header'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import TextField from '../../components/formFields/textField'
import { ScrollView } from 'react-native-gesture-handler'
import { validateEmail, validatePassword } from '../../util'
import {connect} from 'react-redux'
import { setToast,  forgetPassword } from '../../store/actions'
import VerificationModal from '../../components/verificationModal'
import { message } from '../../store/message'

const ForgetPassword = props => {
    const navigation = useNavigation()
   
    const [email, setEmail] = useState('')
    const [showVerificationModal, setshowVerificationModal] = useState(false)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", ()=>handleReset());
        return () => BackHandler.removeEventListener("hardwareBackPress", ()=>handleReset());
       
    }, [])
    const handleReset=()=>{
        setEmail('')
        setReset(true)
    }

    const handleSubmit =()=>{
        try {
            if(!email) throw 'Please provide email or phone number'
            // if()
            
            if(email && !Number(email) &&!validateEmail(email)) throw 'Invalid Email'
            let type =!Number(email)?'email':'phone'
            let obj={
                [type]:email
            }
           
            props.forgetPassword(obj,type, ()=>{
                // handleReset()
                setshowVerificationModal(true)
            })
           
        } catch (error) {
            props.setToast('error', error)
        }
    }


    const verifyForgetOtp = (val) => {
        let decryptVal = (props.emailVerificationCode -10)/2
        // console.log(val,  decryptVal)
        if(Number(val)=== decryptVal){    
            setshowVerificationModal (false)
            props.navigation.navigate('resetPassword',{email:email})
            handleReset()
                
        }else{
            props.setToast('error', message.verification.error)
        }
    }

    const renderDefaultView=()=>(
        <>

            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{
                     handleReset()
                    navigation.toggleDrawer()}}>
                    <ICONS.FontAwesome name={'bars'} size={27} color={COLORS.tomato} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 0.6, marginLeft: '10%' }}
                    onPress={() => { 
                        handleReset()
                        navigation.navigate('home') }}>
                    <Image source={IMAGES.logo} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <ScrollView  keyboardShouldPersistTaps="handled">

            <Text style={styles.title}>Forget Password </Text>
            <View style={{ alignItems: 'center' }}>

                <TextField
                    label={'Email/ Phone No.'}
                    reset={reset}
                    setReset={()=>setReset(!reset)}
                    //  style={{width: email.length?wp(60):wp(85) }}
                    value={email} onTermChange={(val) => setEmail(val)} />

               
                <TouchableHighlight
                underlayColor={COLORS.tomato}
                style={styles.btn} onPress={() =>handleSubmit()}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableHighlight>

                <Text style={styles.caption}>Don't have an account? <Text
                    onPress={() => navigation.navigate('signup')}
                    style={{ color: COLORS.tomato, fontFamily: 'OpenSans-Medium', fontSize: 15 }}>Sign up</Text></Text>

            </View>
            </ScrollView>
            </>
    )

    return (
        
        <ScrollView style={{ backgroundColor: COLORS.white, paddingHorizontal: '5%' }}>

            {showVerificationModal?
                <VerificationModal
                    from={!Number(email)?'email':'phone'}
                    onResend={() => handleSubmit()}
                    onVerify={val => verifyForgetOtp(val)}
                    isVisible={showVerificationModal}
                    goBack={() => setshowVerificationModal(false)} />
    
                :renderDefaultView()}

        </ScrollView>
    )
}
const mapStateToProps= props =>{
    const {  emailVerificationCode, forgetEmail}= props.auth
   
    return{
        emailVerificationCode, forgetEmail
    }
}
export default connect( mapStateToProps , {setToast, forgetPassword})(ForgetPassword)
const styles = StyleSheet.create({
    header: {
        width: wp(100),

        paddingTop: '10%',
        paddingBottom: '5%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        //  paddingTop:'20%'
    },

    logo: {
        width: wp(35),
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: '-10%',
        // marginTop: 10,
        transform: [{ scale: 1.3 }],

    },
    title: {
        ...getFont('Poppins_m_22'),

        // textAlign: 'center',
        color: COLORS.green,
        // marginTop: - hp(1),
        marginLeft: '4%',
        marginBottom: hp(2)
    },
    btn: {
        width: "95%",
        backgroundColor: COLORS.green,
        // borderWidth: 2,
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: '5%',
        alignSelf: "center",
    },
    btnText: {
        color: COLORS.white,
        ...getFont("OpenSans_m_17"),
        textTransform: "uppercase",
    },
    smallBtn: {
        backgroundColor: COLORS.green,
        borderRadius: 25,
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: hp(1.5)
    },
    smallBtnText: {
        color: COLORS.white,

        ...getFont("OpenSans_m_14"),
        textTransform: "uppercase",
    },
    caption: {
        marginTop: '3%',
        color: COLORS.gray,
        ...getFont("OpenSans_r_14"),
    }

})
