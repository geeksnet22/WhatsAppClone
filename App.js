import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './Chats';
import Status from './Status';
import Calls from './Calls';
import Login from './Login';
import { Provider, useSelector } from 'react-redux';
import configureStore from './redux/configureStore';
import { LogBox } from 'react-native';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import { color } from 'react-native-reanimated';

LogBox.ignoreAllLogs();

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  const user = useSelector(state => state.user.user);
  if ( !user ) {
    return <Login />
  }
  return (
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: "#075E54"
          },
          indicatorStyle: {
            backgroundColor: "#FFFFFF"
          },
          activeTintColor: "#FFFFFF"
        }}
      >
        <Tab.Screen 
          name="CHATS" 
          component={Chats}
        />
        <Tab.Screen 
          name="STATUS" 
          component={Status} 
        />
        <Tab.Screen 
          name="CALLS" 
          component={Calls} 
        />
      </Tab.Navigator>
  )
}

const ChatWindowTitle = ({ displayName, photoURL }) => (
  <View style={styles.chatWindowTitle}>
    <Image 
      style={styles.userAvatar}
      source={{
        uri: photoURL
      }}
    />
    <Text style={{color: "#FFFFFF", fontSize: 20}}>{displayName}</Text>
  </View>
)

function App() {
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
            options={{
              headerTitle: "WhatsApp"
            }}
          >
          </Stack.Screen>
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
            options={({ route }) => ({
              headerTitle: <ChatWindowTitle 
                              displayName={route.params.displayName} 
                              photoURL={route.params.photoURL}
                            />
            })}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  chatWindowTitle: {
    flexDirection: "row"
  },
  userAvatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    marginRight: 10,
    backgroundColor: "gray"
  }
});

export default App;