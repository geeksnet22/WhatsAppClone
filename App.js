import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { LogBox } from 'react-native';
import Contacts from './components/Contacts';
import ChatWindow from './components/ChatWindow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Settings from './components/Settings';
import { vw, vh } from 'react-native-expo-viewport-units';
import { navigationRef, navigate } from './RootNavigation';
import Profile from './components/Profile';

LogBox.ignoreAllLogs();

function App() {

  const Stack = createStackNavigator();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentTabName, setCurrentTabName] = useState("HOME");

  const HomeMenu = () => (
    <View style={styles.menuContainer} >
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>New Group</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>New Broadcast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>WhatsApp Web</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Starred Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={() => {
          setIsMenuVisible(false)
          navigate("Settings")}}
      >
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
  )

  const StatusMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Status privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => {
          setIsMenuVisible(false)
          navigate("Settings")}}
      >
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
  )

  const CallsMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Clear call log</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => {
          setIsMenuVisible(false)
          navigate("Settings")}}
      >
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <Provider store={configureStore}>
      <NavigationContainer ref={navigationRef}>
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
            initialParams={{
              setIsMenuVisible: (menuVisibilty) => setIsMenuVisible(menuVisibilty),
              setCurrentTabName: (currentTabName) => setCurrentTabName(currentTabName)
            }}
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
          />
          <Stack.Screen 
            name="ChatWindow"
            component={ChatWindow}
          />
          <Stack.Screen 
            name="Settings"
            component={Settings}  
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {isMenuVisible && 
        <View
          style={styles.invisibleViewContainer}>
          <TouchableOpacity 
            style={styles.inivisibleView} 
            onPress={() => setIsMenuVisible(false)} />
        </View>
      }
      {isMenuVisible && currentTabName === "CHATS" && <HomeMenu />}
      {isMenuVisible && currentTabName === "STATUS" && <StatusMenu />}
      {isMenuVisible && currentTabName === "CALLS" && <CallsMenu />}
    </Provider>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    right: 0,
    top: 30,
    color: "black",
    backgroundColor: "#FFFFFF",
    width: 200
  },
  menuItem: {
    padding: 15
  },
  menuItemText: {
    fontSize: 18
  },
  invisibleViewContainer: {
    position: "absolute",
    top: 30,
    right: 0
  },
  inivisibleView: {
    height: vh(100),
    width: vw(100) 
  }
});

export default App;