import React,{useState, useEffect, useRef} from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet,Image,  Platform,
    BackHandler,
    DeviceEventEmitter, Text,ScrollView, TouchableHighlight, View } from 'react-native'
import Footer from '../../components/layout/footer'
import { getFont, IMAGES, hp, SIZES, wp, COLORS } from '../../constants'
import Banner from '../../components/banner'
import Slider1 from '../../components/sliders/slider1'
import Slider2 from '../../components/sliders/slider2'
import SpecialProducts from './specialProducts'
import Deals from './deals'
import Header from '../../components/layout/header'
import LocationPicker from './location'
import BottomSheetComponent from './bottomSheet'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "@react-native-community/geolocation";
import {connect} from 'react-redux'
import {getAddressFromCords, getShowCaseCategory, selectedAddress,  getCustomerAddress, getMartCode} from '../../store/actions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Brands from './brands'



const Home = props => {
    const navigation = useNavigation()
    const ref = useRef()
    const [scrollVal, setscrollVal] = useState(0)   
    const [showmodal, setshowmodal] = useState(false) 
const [showCaseCategory, setshowCaseCategory] = useState([])
    const [location, setlocation] = useState('')
    const [region, setRegion] = useState("");
    const [initialLocation, setinitialLocation] = useState("")
    const [askForLocation, setaskForLocation] = useState(true)
  
  
    const getGeolocation = () => {
      if (Platform.OS === "android") {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message:
            "<h2>Use Location? </h2> Ucaaz wants to access your location",
          ok: "YES",
          cancel: "NO",
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
          preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
          providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
        })
          .then(
            function (success) {
              // console.log("ssssssssssssssssss",success)
              if(!success.enabled){
                LocationServicesDialogBox.forceCloseDialog();
                setaskForLocation(false)
              }
             // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
                          Geolocation.getCurrentPosition(
                              (position) => {
                  let obj =	{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    // latitudeDelta: 0.015,
                    // longitudeDelta: 0.0121,
  
              
                }
                                  setRegion(obj);
                                  setinitialLocation(obj)
                                  updateLocation(obj)
                  // console.log("OBJ",obj)
                              },
                              (error) => console.log("ERRROR",error),
                              { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                          );
            }
          )
          .catch((error) => {
            // getGeolocation()
            // console.log("ERR MSG",error.message);
            if(error.message==='disabled'){
              LocationServicesDialogBox.forceCloseDialog();
              setaskForLocation(false)
            }
          });
  
        BackHandler.addEventListener("hardwareBackPress", () => {
          //(optional) you can use it if you need it
          LocationServicesDialogBox.forceCloseDialog();
          setaskForLocation(false)
        });
  
        DeviceEventEmitter.addListener(
          "locationProviderStatusChange",
          function (status) {
            console.log("status",status)
            if(!status.enabled){
              LocationServicesDialogBox.forceCloseDialog();
              setaskForLocation(false)
            }
            // only trigger when "providerListener" is enabled
            // console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
          }
        );
      }
    };
  
  
    useEffect(() => {
      // if(props.route.params&& props.route.params.move && props.route.params.move==='mainShop'){
      //   props.navigation.navigate('shop',{catg:props.route.params.catg})
      // }
      console.log("props.route.params-------------",props.route.params)
      if (!region && askForLocation) {
        getGeolocation();
        setaskForLocation(false)
        console.log("11111111111111111111111111111111111111111111111111111111111111111111111111")
      }
      if(!props.showCaseCategory.length){
        props.getShowCaseCategory()
      }
      if(props.showCaseCategory !== showCaseCategory){
        setshowCaseCategory(props.showCaseCategory)
      }
      if(region){
        props.getAddressFromCords(region,(data)=> {
          console.log(".getAddressFromCords data*****************************",data);
          data.results[0] && data.results[0].formatted_address && setlocation(data.results[0].formatted_address)})
        props.getMartCode({lat:region.latitude, lng:region.longitude}, (data)=> console.log(data))
      }
    }, [region, props.showCaseCategory.length, location, initialLocation]);
  

    const handleScrollRef= event =>{
        setscrollVal(event.nativeEvent.contentOffset.y)        
    }

    const updateLocation = val =>{
       
        if(val){
            setRegion(val)
            props.getAddressFromCords(val  ,(data)=> {
              console.log(" updated location*************************",data);
              let addressString = data.results[0] && data.results[0].formatted_address
               addressString &&  setlocation(addressString)
            let obj={}
            if(val.address){
                obj= {...val}
            }else{
                obj={...val}
                obj.address=data.results[0].formatted_address
            }
              props.selectedAddress(obj)
            })
            props.getMartCode({lat:val.latitude|| val.lat, lng:val.longitude || val.lng}, (data)=> console.log("mart------------",data))
          }
        
    }

 const   selectFromSaveAddress=(val)=>{
     updateLocation(val)
     setshowmodal(false)
    }
const updateAdressWithCurrentLocation = () =>{
  if(!initialLocation){
    getGeolocation()
  }
    setRegion(initialLocation)
    updateLocation(initialLocation)
}
console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',props.showCaseCategory , showCaseCategory)  
    return (
        <View>

       

         <Header scrollVal={scrollVal}  from="home"/>
        <ScrollView onScroll={handleScrollRef} ref={ref}>
         <LocationPicker setShowModal={()=>setshowmodal(!showmodal)}/>
          <Banner/>
           <View style={{height:40}}/>
          <Slider1/>
          <View style={{backgroundColor:COLORS.light,}}>
            
        {showCaseCategory.map((item,index)=>(
                   <TouchableOpacity key={index} onPress={()=>props.navigation.navigate('mainShop',{catg:item })}>
                   <Image  style={{width:wp(100), marginBottom:10, height:180}}source={item.image? {uri:item.image} : IMAGES.bannerImg3}/>

              </TouchableOpacity>
        ))}
          </View>
  
         <Slider2 />
         <Deals/>
         <Brands/>
        <SpecialProducts/>
        <Footer/>
        </ScrollView>
        <BottomSheetComponent 
        setCurrentLocation={()=>updateAdressWithCurrentLocation()}
        showModal={showmodal} 
        selectLocation={(val)=> selectFromSaveAddress(val)}
        setShowModal={()=>setshowmodal(!showmodal)}/>
        </View>
    )
}

const mapStateToProps= props=>{

  return{
    showCaseCategory:props.home.showCaseCategory
  }
}

export default connect (mapStateToProps, {getAddressFromCords, selectedAddress, getShowCaseCategory, getCustomerAddress, getMartCode} ) (Home);

const styles = StyleSheet.create({
    sectionImg:{
        resizeMode:'contain',
        width:wp(100),
        // height:20
    }
})
