import React, { useState , useEffect } from 'react'
import { StyleSheet, BackHandler, ScrollView, TouchableHighlight, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TextField from '../../components/formFields/textField'
import Header from '../../components/layout/header'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { postContact , setToast} from '../../store/actions'
import {connect} from 'react-redux'
import { validateEmail } from '../../util'


const Contact = props => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setsubject] = useState('')
  const [message, setmessage] = useState('')
  const [reset, setReset] = useState(false)

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", ()=>handleReset());
    return () => BackHandler.removeEventListener("hardwareBackPress", ()=>handleReset());
   
}, [])

  

  const handleSubmit = () => {

    try {
      if (!username) throw 'username is required'
      if (!email) throw 'email is required'
      if(!validateEmail(email)) throw 'Please enter correct email'
      if (!subject) throw 'subject is required'
      if (!message) throw 'message is required'

      let obj = {
        "your-name": username,
        "your-email": email,
        "your-subject": subject,
        "your-message":message
      }
      // console.log(obj)

      props.postContact(obj, ()=>{
        handleReset()
        navigation.navigate('home')
      })


    } catch (error) {
      props.setToast('error', error)
    }

  }

  const handleReset = ()=>{
    setEmail('')
    setUsername('')
    setsubject('')
    setmessage('')
    setReset(true)
  }

  return (
    <>
      <Header handleReset={()=>handleReset()}/>
      <ScrollView keyboardShouldPersistTaps="handled">

        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.container}>
          <TextField 
               reset={reset} 
               setReset={()=>setReset(!reset)}
               style={styles.input}
                placeholder={'Your Name'} 
                label={'Name'} 
                value={username} 
                onTermChange={(val) => setUsername(val)} />
          <TextField 
               reset={reset} 
               setReset={()=>setReset(!reset)}
               style={styles.input}
                placeholder={'Your Email'} 
                label={'Email'} 
                value={email} 
                onTermChange={(val) => setEmail(val)} />
          <TextField 
               reset={reset} 
               setReset={()=>setReset(!reset)}
               style={styles.input}
                placeholder={'Your Subject'} 
                label={'Subject'} 
                value={subject} 
                onTermChange={(val) => setsubject(val)} />
          <TextField 
               reset={reset} 
               setReset={()=>setReset(!reset)}
               style={styles.textArea}
                multiline={true}
               placeholder={'Your Message'} 
               label={'Message'} 
               value={message} 
               onTermChange={(val) => {
            // console.log("==============",val)
            setmessage(val)
          }} />
          <TouchableHighlight style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  )
}

const mapStateToProps= props=>{
  const {isLoading, profile }=props.user
  const { userAccessKey}= props.auth
  return {
    isLoading, 
    profile,
    userAccessKey
  }
}

export default  connect(mapStateToProps, {setToast, postContact})(Contact)

const styles = StyleSheet.create({
  title: {
    ...getFont('Poppins_m_20'),
    color: COLORS.green,
    paddingLeft: '7%',
    paddingTop: '4%',
    borderTopColor:COLORS.light2,
    borderTopWidth:1,
    // marginTop: hp(1),
    backgroundColor: COLORS.white
  },
  btn: {
    backgroundColor: COLORS.green,

    width: "90%",

    height: 45,
    // elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: '4%',
    alignSelf: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,


  },
  btnText: {
    color: COLORS.white,
    ...getFont("OpenSans_m_16"),
    textTransform: "uppercase",
  },
  container: {
    height: hp(75),
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  textArea: {
    width: wp(90),
    height: 'auto',
    maxHeight: hp(20)
  },
  input: {
    width: wp(90),
    paddingLeft: 5,
    fontSize: 14
    // marginTop:10
    // borderWidth:1
  }

})
