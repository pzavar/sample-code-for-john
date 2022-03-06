import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet,Image, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native'
import { getFont, COLORS, ICONS, IMAGES, wp, hp } from '../../constants'
import { drawerRoutes } from '../../route/routeList'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

const DrawerContent = (props) => {
  const [routeList, setrouteList] = useState([])
  const [pressTab, setPressTab] = useState('')
  const [pressSubMenuTab, setPressSubMenuTab] = useState('')
  const slideAnim1 = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation()

  // const animatedRef = useRef(null)

  // bounceValue: new Animated.Value(100)


  const addRefInSubMenu = (routeData, reference) => {
    let ref = reference
    let route = routeData
    if (route.subroute && route.subroute.length) {
      route.showMenu = false

      for (let index = 0; index < route.subroute.length; index++) {
        let route2 = route.subroute[index];
        route2.ref = ref + ',' + index
        addRefInSubMenu(route2, route2.ref)
      }
    }
    return route
  }

  useEffect(() => {
    if (!routeList.length && drawerRoutes.length) {
      let temp = []
      for (let index = 0; index < drawerRoutes.length; index++) {
        let route = drawerRoutes[index];
        route.ref = index.toString()
        temp.push(addRefInSubMenu(route, route.ref))
      }
      setrouteList(temp)
    }

  }, [])



  handleClick = (item, hasSubMenuItem, index) => {
    // setPressTab(item.name)
    let temp = [...routeList]
    if (hasSubMenuItem) {

      if (!temp[index].showMenu) {
        slide(0, slideAnim2, () => {
          temp[index].showMenu = !temp[index].showMenu
          return setrouteList(temp)
        })
      } else {
        slide(-50 * temp[index].subroute.length + 1, slideAnim2, () => {
          temp[index].showMenu = !temp[index].showMenu
          return setrouteList(temp)
        })
      }
      // temp[index].showMenu = !temp[index].showMenu
      // temp[index].showMenu? slide(5, slideAnim2 ):slide(-20, slideAnim2)

    } else {

      alert(item.name)
    }
    // console.log(routeList)
  }


  const slide = (toValue, animRef, callback) => {

    // return Animated.spring(
    //   animRef,
    //   {
    //     toValue: toValue,
    //     velocity: 1,
    //     tension: 2,
    //     friction: 4,
    //     useNativeDriver: true
    //   }
    // ).start(callback);
    // console.log(toValue, animRef)
    Animated.parallel([
      Animated.timing(fadeAnim1, {
        toValue: toValue < 0 ? 0 : 0.6,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(
        animRef,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
          // duration:300,
          useNativeDriver: true
        })

    ]).start(callback)
  };


  const handleSubMenuClick = (menuItem) => {
    // setPressTab(menuItem)
    setPressSubMenuTab(menuItem)

    // alert("test "+menuItem.name)
    let temp = [...routeList] // hold parent route list

    let ref = menuItem.ref && menuItem.ref.split(',')

    let temp2 = temp[ref[0]] // hold the initial reference of menu item

    // console.log(temp2.subroute)

    // looping the reference to reach till the end of the reference
    for (let index = 1; index < ref.length; index++) {

      // if it has subroute then loop  the subroute and 
      // find the reference index in the reference of subroute objects

      if (temp2 && temp2.subroute && temp2.subroute.length) {

        for (let index2 = 0; index2 < temp2.subroute.length; index2++) {
          const temp3 = temp2.subroute[index2];
          if (temp3.ref === ref[index]) {
            // console.log('////////////////', temp3)
          }

        }
        // console.log(temp2.subroute[ref[index]])
        temp2 = temp2.subroute[ref[index]]
        // console.log("............", temp2)
        if (temp2.name === menuItem.name && temp2.subroute && temp2.subroute.length) {
          // console.log("ASDASDASDASDASASDASD")
          temp2.showMenu= !temp2.showMenu
          // if (!temp2.showMenu) {
          //   slide(0, slideAnim1, () => {
          //     // return
          //      temp2.showMenu = !temp2.showMenu
          //     // return  setrouteList(temp2)
          //   })
          // } else {
          //   slide(20 * temp2.subroute.length, slideAnim1, () => {
          //     // return 
          //     temp2.showMenu = !temp2.showMenu
          //     //  return setrouteList(temp2)
          //   })
          // }
          // temp2.showMenu? animatedRef.slideInDown():animatedRef.slideIn
        }


      } else {
        // console.log("============", temp2)
      }

    }

    // console.log('--------', temp)
    setrouteList(temp)

  }

  const SubLink = (item, index) => {
    return (

      item.map((subItem, subIndex) => (

        <View key={subIndex} style={-100}>
          <TouchableWithoutFeedback
            onPress={() => handleSubMenuClick(subItem)}

          >
            <View style={styles.subMenuItem}>
              <Text style={styles.subMenuItemText}>{subItem.name}</Text>

              {subItem.subroute && subItem.subroute.length &&
                <ICONS.Entypo name={
                  // pressSubMenuTab.name === subItem.name ?
                  (subItem.showMenu ? 'minus' : 'plus') 
                  // : 'home'
                }
                  size={20} color={COLORS.black1} />}

              {/* {subItem.subroute && subItem.subroute.length &&
                <ICONS.Entypo name={subItem.showMenu ? 'minus' : 'plus'} size={20} color={COLORS.black1} />} */}
            </View>
          </TouchableWithoutFeedback>

          {subItem.subroute && subItem.subroute.length && subItem.showMenu && SubLink(subItem.subroute, subIndex)}

        </View>
      ))
    )
  }

  return (
    <View>
      <View >
        <TouchableWithoutFeedback onPress={()=>{
          props.toggleDrawer(),
          // console.log(navigation.navigate('home'))
          navigation.navigate('home')
        }}>
            <Image source={IMAGES.logo} style={styles.logo} />
        </TouchableWithoutFeedback>
        
        {/* <View style={{position:'absolute', top:'58%', right:wp(10)}}>
        <TouchableOpacity  onPress={()=>props.toggleDrawer()}>
          <ICONS.AntDesign 
            name={'closecircleo'} 
            size={35} 
            color={COLORS.green} 
            style={{backgroundColor:COLORS.white}}/>
        </TouchableOpacity>
        </View> */}
        
      </View>
      {drawerRoutes.map((item, index) => (

        <Animated.View key={index} 
        style={[pressTab && Number(pressTab.ref) + 1 === index && { transform: [{ translateY: slideAnim2 }] }]}>
          {/* {console.log("nnnnnnnnnnnnn", pressTab.ref, Number(pressTab.ref) + 1, Number(pressTab.ref) + 1 === index)} */}
          <TouchableWithoutFeedback
            onPress={() => {
              setPressTab(item)
              handleClick(item, item.subroute && item.subroute.length, index)
            }}

          >

            <View style={[styles.subMenuItem, {
              backgroundColor: COLORS.white, zIndex: 100
            }]}>


              <Text style={{
              //  ...getFont('OpenSans_m_14'),
                backgroundColor: COLORS.white,
                // zIndex:40, 
                // textTransform: "uppercase",
                // color: COLORS.green
              }}>{item.name}</Text>
              {item.subroute && item.subroute.length &&
                <ICONS.Entypo name={pressTab.name === item.name ?
                  (item.showMenu ? 'minus' : 'plus') : 'plus'}
                  size={20} color={COLORS.black1} />}
            </View>
          </TouchableWithoutFeedback>

          <Animated.View style={{ transform: [{ translateY: slideAnim2 }], opacity: fadeAnim1 }}>
            {item.subroute && item.subroute.length && pressTab.name === item.name &&
              //  item.showMenu && 
              SubLink(item.subroute, index)
            }
          </Animated.View>

          {/* </Animated.View> */}


        </Animated.View>
      ))}

    </View>
  )
}

export default DrawerContent

const styles = StyleSheet.create({
  subMenuItem: {
    paddingHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '3.5%',
    //  backgroundColor:COLORS.gray,
    zIndex: -100
  },
  subMenuItemText: {
    ...getFont('OpenSans_r_16'),
    letterSpacing: 0.25,
    paddingHorizontal: '6%',
    // paddingBottom: '4%',
    textTransform: "capitalize",
    color: COLORS.gray3
  },
  logo:{
    width:wp(30),
    // height:20,
    transform:[{scale:1.3}],
    resizeMode:'contain',
    alignSelf:'center',
    marginTop:60,
    // backgroundColor:'red'
}


})
