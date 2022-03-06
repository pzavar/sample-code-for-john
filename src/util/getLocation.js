import React from "react";

import {
  BackHandler,
  DeviceEventEmitter,
  Platform,
} from "react-native"
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from "@react-native-community/geolocation";

export const getCurrentLocation = () => {
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
                    // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
                    Geolocation.getCurrentPosition(
                        (position) => {
                            // console.log(position);
                            let obj = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,

                            }
                            // setRegion(obj);
                            // setinitialLocation(obj)
                            // console.log(obj)
                            return {success:true, location:obj}
                        },
                        (error) => {
                            console.log(error)
                            return{success:false}
                        },
                        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                    );
                }
            )
            .catch((error) => {
                getGeolocation()
                console.log(error.message);
            });

            BackHandler.addEventListener("hardwareBackPress", () => {
                //(optional) you can use it if you need it
                LocationServicesDialogBox.forceCloseDialog();
              });
        
              DeviceEventEmitter.addListener(
                "locationProviderStatusChange",
                function (status) {
                  // only trigger when "providerListener" is enabled
                  // console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
                }
              );
            }
    
}