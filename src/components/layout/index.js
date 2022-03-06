
import React, { Children, useState, useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView, ScrollView } from "react-native";
import { wp } from "../../constants";
import Drawer from './drawer'
import Footer from './footer'
import Header from './header'
import DrawerContent from './drawer'
const App = ({children}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const slideAnim = useRef(new Animated.Value(1)).current;
  const [showDrawer, setshowDrawer] = useState(false)

 const _start = () => {

      return Animated.timing(slideAnim, {
          toValue: 1,
         duration: 400,
         useNativeDriver: true
       }).start();
  
};
const slideOut = () => {
  return Animated.timing(slideAnim, {
       toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start();
};

const toggleDrawer=async()=>{
  await  setshowDrawer(!showDrawer)
  showDrawer? _start(): slideOut()
}

  return (
    <View>
     
       {/* <View style={{flexDirection:'row'}}> */}
       <Animated.View
        style={[
         
          {
            // Bind opacity to animated value
            // opacity: fadeAnim
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -403]
                })
                // translateY: slideAnim.interpolate({
                //   inputRange: [0, 1],
                //   outputRange: [500, 0]
                // })
              }
            ],
            // width:
          }
        ]}
      >
       <View style={{flexDirection:'row', minHeight:'100%'}}>
         
        <View style={{
                      width:wp(100) , shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.34,
                      shadowRadius: 6.27,
                       backgroundColor:'white', 
                       marginRight:12,
                      //  paddingTop:100,
                       elevation:10}}>
            <DrawerContent  toggleDrawer={()=> toggleDrawer()}/>
        </View>
        {/* <SafeAreaView> */}
         <View style={{width:wp(101),
          //  borderWidth:2, borderColor:'red'
           }}>
        <Header toggleDrawer={()=> toggleDrawer()}/>    
        {children}
        {/* </View> */}    
        </View>
        {/* </SafeAreaView> */}
       
         
        </View> 
        
      

      
      
      </Animated.View>
      
     
      {/* </View> */}
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:0,
    // backgroundColor:'green'
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  },
  fadingContainer: {
    // padding: 20,
    // height:800,
    width:'100%',
    // backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 20,
    color:'black',
    opacity:1

  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  }
});

export default App;