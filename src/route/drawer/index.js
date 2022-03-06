import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  wp } from '../../constants';
import DrawerContent from './drawerContent';
import { drawerRouteList } from '../routeList';

const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {

  return (
  
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: wp(90) },
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        { drawerRouteList.map((item, index) => (
          <Drawer.Screen name={item.name} component={item.component} />
        ))}
      </Drawer.Navigator>
     
  );
}

export default DrawerNavigator