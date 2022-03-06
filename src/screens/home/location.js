import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Animated,
  StyleSheet,
  Text,
  View,
  Touchable,
  LayoutAnimation,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  BackHandler,
  AppState,
  DeviceEventEmitter,
  Alert,
} from 'react-native';


import { COLORS, getFont, ICONS, wp } from '../../constants';
import {useNavigation} from '@react-navigation/native'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "@react-native-community/geolocation";
import {connect} from 'react-redux'
import {getAddressFromCords, getCustomerAddress, getMartCode} from '../../store/actions'


const LocationPicker = props => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation()
  const [location, setlocation] = useState('')
  const [region, setRegion] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
            if(!success.enabled){
              LocationServicesDialogBox.forceCloseDialog();
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
                // console.log("location page obj",obj)
							},
							(error) => console.log(error),
							{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
						);
          }
        )
        .catch((error) => {
          // getGeolocation()
          LocationServicesDialogBox.forceCloseDialog();
          // console.log("location page error",error.message);
        });

      BackHandler.addEventListener("hardwareBackPress", () => {
        //(optional) you can use it if you need it
        LocationServicesDialogBox.forceCloseDialog();
      });

      DeviceEventEmitter.addListener(
        "locationProviderStatusChange",
        function (status) {
          if(!status.enabled){
            LocationServicesDialogBox.forceCloseDialog();
          }
          // only trigger when "providerListener" is enabled
          // console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        }
      );
    }
  };

  const getAndCompareCurrentLocation = ()=>{
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
            if(!success.enabled){
              LocationServicesDialogBox.forceCloseDialog();
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
                console.log("region ,obj", {region, obj})
              
								// setRegion(obj);
                if( Math.abs(obj.latitude- region.latitude)  >= 0.0001538  ||  Math.abs(obj.longitude- region.longitude)  >= 0.00005089999 ){
                  Alert.alert(
                    'Confirmation',
                    'Do you want to update the location?',
                    [
                      {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => {
                        setRegion(obj)
                        props.getAddressFromCords(region,(data)=> {
                          data.results[0] && data.results[0].formatted_address && setlocation(data.results[0].formatted_address)})
                          props.getMartCode({lat:region.latitude, lng:region.longitude}, (data)=> console.log(data))
                      } }
                    ]
      
      
                  )
                }
                console.log("location page obj",obj)
							},
							(error) => console.log(error),
							{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
						);
          }
        )
        .catch((error) => {
          // getGeolocation()
          LocationServicesDialogBox.forceCloseDialog();
          console.log("location page error",error.message);
        });

      BackHandler.addEventListener("hardwareBackPress", () => {
        //(optional) you can use it if you need it
        LocationServicesDialogBox.forceCloseDialog();
      });

      DeviceEventEmitter.addListener(
        "locationProviderStatusChange",
        function (status) {
          if(!status.enabled){
            LocationServicesDialogBox.forceCloseDialog();
          }
          // only trigger when "providerListener" is enabled
          // console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        }
      );
    }
  }

  

  useEffect(() => {

    //app state change listner
    // on change app shate if the location already exist then ask for update location else pick current location
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active" ) {
        console.log("App has come to the foreground!");
        if(region){   
          getAndCompareCurrentLocation()
        
        }
      }


      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
     
    });


    if (!region) {
      getGeolocation();
    }
    if(region && !location){
      props.getAddressFromCords(region,(data)=> {
        data.results[0] && data.results[0].formatted_address && setlocation(data.results[0].formatted_address)})
        props.getMartCode({lat:region.latitude, lng:region.longitude}, (data)=> console.log(data))
    }
    if(props.selectedAddress&& props.selectedAddress.address){
      setlocation(props.selectedAddress.address)
    }


    return () => {
      subscription.remove();
    };
  }, [region, location,props.selectedAddress]);


  return (
    <>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => props.setShowModal()}>
          <View style={{flexDirection:'row', 
          backgroundColor:COLORS.darkBlue,
           width:wp(100),
           marginLeft:-10, 
           height:50,
           alignItems:'center',
           paddingHorizontal:'4%',
                      justifyContent:'space-between'}}>
         
           {!!location ?<Text style={styles.selectedLocation}>
            <Text style={{color:COLORS.tomato}} >{location.length>42?location.slice(0,42)+"...":location }</Text>
            </Text>: <Text style={styles.selectedLocation}> SECLECT DELIVERY LOCATION</Text>}
            <ICONS.AntDesign name={'down'} size={18} color={COLORS.white}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
  
    </>
  );
};
const mapStateToProps= props=>{
  const {selectedAddress}= props.user
  console.log("selectedAddress-----------------------", selectedAddress)
  return {
    selectedAddress
  }
}
export default connect ( mapStateToProps, {getAddressFromCords, getCustomerAddress, getMartCode} ) (LocationPicker);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    // paddingTop: 20,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    zIndex: 100,
    // elevation: 5,
  },
  selectedLocation:{
    ...getFont('Poppins_b_14'),
    // color:COLORS.gray,
    fontWeight:'bold',
    color:COLORS.white
  }
});
