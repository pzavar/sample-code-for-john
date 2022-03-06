import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { Toast } from '../components'
import { clearToast } from '../store/actions'
import { routeList } from './routeList';
import Loader from '../components/Loader';

const Stack = createStackNavigator();

const Route = props => {

  const {
    toastConfig,
    authLoader,
    catgAngPrdtLoader,
    homeLoader,
    userLoader,
    favouriteLoader,
    cartLoader,
    orderLoader,
  } = props
  
  return (
    <NavigationContainer >
      {props.isToastShowing &&
        <Toast
          {...props.toastConfig}
          isToastShowing={props.isToastShowing}
          clearToast={() => props.clearToast()} />
      }
     

      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
        screenOptions={{
          headerShown: false,
        }}>
        {routeList.map((item, index) => (
          <Stack.Screen name={item.name} component={item.component} />
        ))}
      </Stack.Navigator>
      {
       ( authLoader||
         catgAngPrdtLoader||
         homeLoader||
         cartLoader ||
         favouriteLoader||
         orderLoader||

         userLoader) && <Loader/>
      }
 
    

    </NavigationContainer>
  );
}

const mapStateToProps = props => {
  const { config, isToastShowing } = props.toast
  // console.log(props.toast)
  return {

    toastConfig: config,
    isToastShowing,
    authLoader: props.auth.isLoading,
    cartLoader: props.cart.isLoading,
    catgAngPrdtLoader: props.catgAngPrdt.isLoading,
    favouriteLoader: props.favourite.isLoading,
    homeLoader: props.home.isLoading,
    orderLoader: props.order.isLoading,
    userLoader: props.user.isLoading

  }

}
export default connect(mapStateToProps, { clearToast })(Route);