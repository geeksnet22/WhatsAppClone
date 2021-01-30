import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { LogBox } from 'react-native';
import Contacts from './components/Contacts';
import ChatWindow from './components/ChatWindow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {
  
  // const HomeScreenMenu = () => (
  //   <View style={ styles.homeScreenMenu } >
  //     <TouchableOpacity style={{ padding: 15 }}>
  //       <Text style={{ fontSize: 18 }}>New Group</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{ padding: 15 }}>
  //       <Text style={{ fontSize: 18 }}>New Broadcast</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{ padding: 15 }}>
  //       <Text style={{ fontSize: 18 }}>WhatsApp Web</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{ padding: 15 }}>
  //       <Text style={{ fontSize: 18 }}>Starred Messages</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={{ padding: 15 }}>
  //       <Text style={{ fontSize: 18 }}>Settings</Text>
  //     </TouchableOpacity>
  //   </View>
  // )

  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#075E54",
              elevation: 0,
              borderBottomWidth: 0
            },
            headerTintColor: "#FFFFFF"
          }}
        >
          <Stack.Screen 
            name="Home"
            component={Home}
          />
          <Stack.Screen 
            name="Login"
            component={Login}
            options={({
              headerLeft: () => <Text>Log in</Text>
            })
            }
          />
          <Stack.Screen 
            name="Signup"
            component={Signup}

          />
          <Stack.Screen 
            name="Contacts"
            component={Contacts}
            options={({
              headerTitle: "Select contact"
            })}
          >
          </Stack.Screen>
          <Stack.Screen 
            name="ChatWindow"
            component={ChatWindow}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  homeScreenMenu: {
    position: "absolute",
    right: 0,
    top: 30,
    color: "black",
    backgroundColor: "#FFFFFF",
    width: 250
  }
});

export default App;