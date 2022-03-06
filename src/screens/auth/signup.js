import React, { useState, useEffect } from 'react'
import { ScrollView, BackHandler, TouchableHighlight, Image, Modal, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import TextField from '../../components/formFields/textField'
import VerificationModal from '../../components/verificationModal'
import { validateEmail, validatePassword } from '../../util'
import { connect } from 'react-redux'
import { setToast, signup, verifiedEmailOTP, verifiedPhoneOTP, sendEmailOtp, sendPhoneOtp } from '../../store/actions'
import { message } from '../../store/message'
const Signup = props => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setshowPassword] = useState(false)
    const [showEmailOTPModal, setshowEmailOTPModal] = useState(false)
    const [showPhoneOTPModal, setshowPhoneOTPModal] = useState(false)
    const [verifiedEmail, setverifiedEmail] = useState(false)
    const [verifiedPassword, setverifiedPassword] = useState(false)
    const [isEmailVerified, setisEmailVerified] = useState(false)
    const [isPhoneVerified, setisPhoneVerified] = useState(false)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => handleReset());
        return () =>{
            BackHandler.removeEventListener("hardwareBackPress", () => handleReset());}

    }, [])

    const handleReset = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setPassword('')
        setshowPassword(false)
        setshowEmailOTPModal(false)
        setshowPhoneOTPModal(false)
        setverifiedEmail('')
        setverifiedPassword('')
        setisEmailVerified(false)
        setisPhoneVerified(false)
        setReset(true)
        // navigation.goBack()
    }

    const handleSubmit = () => {
        try {
            if (!firstName) throw 'firstname is required'
            if (!lastName) throw 'lastname is required'
            if (!email && !phone) throw 'please provide email or phone number'
            if (email && !validateEmail(email)) throw 'invalid email'
            if (email && !isEmailVerified) throw 'Please verify your email'
            if (phone && !isPhoneVerified) throw 'Please  verify phone number'

            if (!password) throw 'password field is required'
            if (!validatePassword(password))
              throw message.password.error

            let obj = {
                first_name: firstName,
                last_name: lastName,
                // email: email,
                password: password,
                // mobile_number: phone
            }
            email && (obj.email = email);
            phone && (obj.mobile_number = phone);

            props.signup(obj, () => {
                handleReset()
                navigation.navigate('login')})

        } catch (error) {
            props.setToast('error', error.message || error)
        }
    }


    const handleSendEmailOtp = () => {
        // console.log('runnnn')
        setshowEmailOTPModal(true)
        props.sendEmailOtp({ email })
    }

    const verifyEmailOtp = (val) => {
        let decryptVal = (Number(props.emailVerificationCode) - 10) / 2

        if (Number(val) === decryptVal) {
            props.verifiedEmailOTP(() => {
                setshowEmailOTPModal(false)
                setisEmailVerified(true)
            })
        } else {
            setToast('erorr', message.verification.error)
        }
    }

    const handleSendPhoneOtp = () => {
        setshowPhoneOTPModal(true)
        props.sendPhoneOtp({ phone })
    }

    const verifyPhoneOtp = (val) => {
        let decryptVal = (Number(props.phoneVerificationCode) - 10) / 2
        if (Number(val) === Number(decryptVal)) {
            props.verifiedPhoneOTP(() => {
                setshowPhoneOTPModal(false)
                setisPhoneVerified(true)
            })
        } else {
            props.setToast('erorr', message.verification.error)
        }
    }


    const renderDefaultView = () => (
        <>

            <View style={styles.header}>
                <TouchableOpacity onPress={() =>{
                    handleReset()
                    navigation.toggleDrawer()
                    }}>
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
            <ScrollView keyboardShouldPersistTaps="handled">

                <Text style={styles.title}>Create Account</Text>
                <View style={{ alignItems: 'center' }}>

                    <TextField
                        reset={reset}
                        setReset={() => setReset(!reset)}
                        label={'First Name'} value={firstName} onTermChange={(val) => setFirstName(val)} />
                    <TextField
                        reset={reset}
                        setReset={() => setReset(!reset)}
                        label={'Last Name'} value={lastName} onTermChange={(val) => setLastName(val)} />
                    <View>
                        <TextField
                            reset={reset}
                            setReset={() => setReset(!reset)}
                            label={'Email'}
                            //  style={{width: email.length?wp(60):wp(85) }}
                            value={email} onTermChange={(val) =>{ 
                                setEmail(val)
                                setisEmailVerified(false)
                                }} />
                        {validateEmail(email) && !isEmailVerified &&
                            <View style={styles.smallBtn}>
                                <TouchableOpacity onPress={() => handleSendEmailOtp()}>
                                    <Text style={styles.smallBtnText}>Send OTP</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    <View>
                        <TextField
                            reset={reset}
                            setReset={() => setReset(!reset)}
                            label={'Phone No.'}
                            keyboardType={'phone-pad'}
                            value={phone} onTermChange={(val) => {
                                setPhone(val)
                                setisPhoneVerified(false)
                                }} />
                        {!!phone && !isPhoneVerified &&
                            <View style={styles.smallBtn}>
                                <TouchableOpacity onPress={() => handleSendPhoneOtp()}>
                                    <Text style={styles.smallBtnText}>Send OTP</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    <View>
                        <TextField
                            reset={reset}

                            setReset={() => setReset(!reset)}
                            secureText={!showPassword} label={'Password'} value={password} onTermChange={(val) => setPassword(val)} />
                        <View style={[styles.smallBtn, { backgroundColor: COLORS.white, alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                                <ICONS.Entypo name={showPassword ? "eye-with-line" : "eye"} color={COLORS.green} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                        <Text style={{color:COLORS.lightGray, fontSize:12,
                    width:wp(85),
                    marginTop:5,
                    fontFamily:'Poppins-Regular'}}>{message.password.desc}</Text>
                    <TouchableHighlight
                    underlayColor={COLORS.greenLightShade01}
                    style={styles.btn} onPress={() => handleSubmit()}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableHighlight>

                    <Text style={styles.caption}>Already have an account? <Text
                        onPress={() =>{
                            handleReset();
                            navigation.navigate('login');
                        }}
                        style={{ color: COLORS.tomato, fontFamily: 'OpenSans-Medium', fontSize: 15 }}>Sign in</Text></Text>

                </View>
            </ScrollView>
        </>
    )
    return (<>

        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: COLORS.white, paddingHorizontal: '5%' }}>

            {showEmailOTPModal ? <VerificationModal
                onResend={() => handleSendEmailOtp()}
                onVerify={val => verifyEmailOtp(val)}
                isVisible={showEmailOTPModal}
                goBack={() => setshowEmailOTPModal(false)} />

                : showPhoneOTPModal ?
                    <VerificationModal
                        onResend={() => handleSendPhoneOtp()}
                        onVerify={val => verifyPhoneOtp(val)}
                        isVisible={showPhoneOTPModal}
                        from={'phone'}
                        goBack={() => setshowPhoneOTPModal(false)} />

                    : renderDefaultView()}




        </ScrollView>

    </>
    )
}

const mapStateToProps = props => {

    const { emailVerificationCode, phoneVerificationCode } = props.auth
    // console.log("phoneVerificationCode", props.auth)
    return {
        emailVerificationCode,
        phoneVerificationCode,
    }
}

export default connect(mapStateToProps, { setToast, verifiedPhoneOTP, verifiedEmailOTP, signup, sendEmailOtp, sendPhoneOtp })(Signup)

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
        borderColor: COLORS.green,
        borderWidth: 2,
        borderRadius: 25,
        // backgroundColor:COLORS.green,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: '5%',
        alignSelf: "center",
    },
    btnText: {
        color: COLORS.green,
        // color:COLORS.white,
        ...getFont("OpenSans_m_17"),
        textTransform: "uppercase",
    },

    smallBtn: {
        height: 40,
        position: 'absolute',
        right: 0,
        top: hp(1.5),
        color: COLORS.white,
        width: 100,
        borderRadius: 10,
        textAlign: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green
    },
    smallBtnText: {
        color: COLORS.white, ...getFont('Poppins_m_14')
    },
    caption: {
        marginTop: '3%',
        color: COLORS.gray,
        ...getFont("OpenSans_r_14"),
    },

    backview: {
        flexDirection: 'row',
        margin: '5%'
    },
    // =================================================

    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },

})
