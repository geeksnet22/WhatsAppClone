import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Calls from './Calls';
import Chats from './Chats';
import Status from './Status';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function HomeTabs() {

    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => 
                <Text 
                    style={{ 
                    color: "#FFFFFF",
                    fontSize: 20,
                    padding: 10 }}>WhatsApp</Text>,
            headerRight: () => 
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
                            onPress={() => {}}/>
                    </TouchableOpacity>
                </View>
        })
    }, [navigation])

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

export default HomeTabs
