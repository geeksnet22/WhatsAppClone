import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Calls from './Calls';
import Chats from './Chats';
import Status from './Status';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

function HomeTabs() {

    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation();
    const currentTabName = useSelector(state => state.currentTabName.currentTabName);
    const route = useRoute();

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
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerRightIcon}>
                    <Ionicons
                        name="search" 
                        size={20} 
                        color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.headerRightIcon}
                        onPress={
                            () => route.params?.setIsMenuVisible(true)
                        }
                    >
                        <Entypo
                            name="dots-three-vertical" 
                            size={20} 
                            color="#FFFFFF" 
                            onPress={() => {}}/>
                    </TouchableOpacity>
                </View>
        })
    }, [navigation, currentTabName])

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

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: "row"
    },
    headerRightIcon: {
        padding: 12
    }
})

export default HomeTabs;