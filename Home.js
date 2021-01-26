import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { useSelector } from 'react-redux';
import Calls from './Calls';
import Chats from './Chats';
import Login from './Login';
import Status from './Status';

const Tab = createMaterialTopTabNavigator();

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

export default Home
