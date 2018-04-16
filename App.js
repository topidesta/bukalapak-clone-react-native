/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  UIManager
} from 'react-native';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { Provider } from "react-redux";
import MainContent from './src/components/MainContent'
import rootReducer from './src/reducers/rootReducer';
import watchSagas from './src/saga/rootSaga';
import { StackNavigator } from "react-navigation";
import { Icon } from 'native-base';
import HomeScreen from './src/components/HomeScreen/index'

const sagaMiddleware = createSagaMiddleware()
function configureStore() {
  let store
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(watchSagas)
  return store
}
const store = configureStore()
const RootStack = StackNavigator({
  Home: {
    screen: MainContent
  }
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#D71149'
      },
      headerLeft: (
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity>
            <Icon name='menu' style={{ color: 'white' }} />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: (
        <View style={{
          backgroundColor: 'white',
          width: 40,
          height: 40,
          borderRadius: 3,
          marginLeft: 16
        }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{
              color: '#D71149',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 24,
              fontWeight: 'bold'




            }}>
              BL
          </Text>
          </View>


        </View>
      ), headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Icon name='search' style={{ color: 'white' }} />
          </View>

        </View>


      ),
    }
  })

class App extends React.Component {

  constructor()
  {
    super()
    if(Platform.OS==='android')
    {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
  }
  render() {
    return (
      <Provider store={store} >
        
        <HomeScreen/>
      </Provider>
    );
  }
}
export default App;

