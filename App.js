import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './Chats';
import Status from './Status';
import Calls from './Calls';
import Login from './Login';
import { Provider, useSelector } from 'react-redux';
import configureStore from './redux/configureStore';
import { LogBox } from 'react-native';
import Contacts from './Contacts';

LogBox.ignoreAllLogs();

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  const user = useSelector(state => state.user.user);
  if ( !user ) {
    return <Login />
  }
  return (
      <Tab.Navigator>
        <Tab.Screen name="CHATS" component={Chats} />
        <Tab.Screen name="STATUS" component={Status} />
        <Tab.Screen name="CALLS" component={Calls} />
      </Tab.Navigator>
  )
}

function App() {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#075E54",
            }
          }}>
          <Stack.Screen 
            name="Home"
            component={Home}>
          </Stack.Screen>
          <Stack.Screen 
            name="Contacts"
            component={Contacts}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;