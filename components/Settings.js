import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Settings() {

    const user = useSelector(state => state.user.user)

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity 
                style={styles.userInfoContainer}>
                <Image 
                    style={styles.avatar}
                    source={{
                        uri: user.photoURL
                    }}
                />
                <Text style={styles.userName}>
                    {user.name?.split(" ")[0]}
                </Text>
            </TouchableOpacity>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItemContainer}>
                    <View style={styles.menuItemContainer}>
                        <MaterialCommunityIcons 
                            name="key-variant" 
                            size={24} 
                            color="black" />
                    </View>
                    
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.primaryText}>Account</Text>
                        <Text style={styles.secondaryText}>Privacy, security, changeNumber</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomColor: "gray",
        borderBottomWidth: 0.2
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "gray"
    },
    userName: {
        fontSize: 25,
        marginLeft: 15
    },
    menuContainer: {
        padding: 15
    },
    menuItemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    menuIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    menuTextContainer: {
        marginLeft: 15
    },
    primaryText: {
        fontSize: 18
    },
    secondaryText: {
        fontSize: 15,
        color: "gray"
    }
})

export default Settings;
