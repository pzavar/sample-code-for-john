import React from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import Route from './src/route'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Route/>    
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
