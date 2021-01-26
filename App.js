import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { LogBox } from 'react-native';
import Contacts from './Contacts';
import ChatWindow from './ChatWindow';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from './Home';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {

  const [showMenu, setShowMenu] = useState(false)

  const ChatWindowLeftHeader = ({ navigation, route }) => (
    <View style={styles.chatWindowLeftHeader}>
      <TouchableOpacity 
        style={{ flexDirection: "row" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons 
          name="arrow-back-sharp" 
          size={25} 
          color="#FFFFFF"
        />
        <Image 
          style={styles.userAvatar}
          source={{
            uri: route.params.photoURL
          }}
        />
      </TouchableOpacity>
      <Text style={{ 
              color: "#FFFFFF", 
              fontSize: 20 }}>{route.params.displayName}</Text>
    </View>
  )
  
  const ChatWindowRightHeader = () => (
    <View style={styles.chatWindowRightHeader}>
      <FontAwesome5 
        style={{ padding: 12 }}
        name="video" 
        size={20} 
        color="#FFFFFF"
      />
      <Ionicons 
        style={{ padding: 12 }}
        name="call" 
        size={20} 
        color="#FFFFFF" />
      <Entypo 
        style={{ padding: 12 }}
        name="dots-three-vertical" 
        size={20} 
        color="#FFFFFF" />
    </View>
  )
  
  const HomeRightHeader = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ padding: 12 }}>
        <Ionicons
          name="search" 
          size={20} 
          color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 12 }}>
        <Entypo
          name="dots-three-vertical" 
          size={20} 
          color="#FFFFFF" 
          onPress={() => setShowMenu(true)}/>
      </TouchableOpacity>
    </View>
  )
  
  const HomeScreenMenu = () => (
    <View style={ styles.homeScreenMenu } >
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>New Group</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>New Broadcast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>WhatsApp Web</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>Starred Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ fontSize: 18 }}>Settings</Text>
      </TouchableOpacity>
    </View>
  )

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
              title: "",
              headerLeft: () => <Text 
                                  style={{ 
                                    color: "#FFFFFF",
                                    fontSize: 20,
                                    padding: 10 }}>WhatsApp</Text>,
              headerRight: () => <HomeRightHeader />
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
            options={({ navigation, route }) => ({
              title: "",
              headerLeft: () => <ChatWindowLeftHeader
                                  navigation={navigation}
                                  route={route}
                                />,
              headerRight: () => <ChatWindowRightHeader />,
            })}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {showMenu && <HomeScreenMenu />}
    </Provider>
  )
}

const styles = StyleSheet.create({
  chatWindowLeftHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  chatWindowRightHeader: {
    flexDirection: "row"
  },
  userAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "gray"
  },
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