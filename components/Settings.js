import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
                <Text>
                    {user.displayName}
                </Text>
            </TouchableOpacity>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItemContainer}>
                    <MaterialCommunityIcons 
                        name="key-variant" 
                        size={24} 
                        color="black" />
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
        flexDirection: "row"
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    userName: {

    },
    menuContainer: {

    },
    menuItemContainer: {

    },
    menuIcon: {

    },
    menuTextContainer: {

    },
    primaryText: {

    },
    secondaryText: {

    }
})

export default Settings
