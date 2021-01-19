import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function Chat({ displayName, photoURL, lastMessage, timeAgo }) {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.userAvatar}
                source={{
                    uri: photoURL
                }} 
            />
            <View style={styles.textContainer}>
                <View style={styles.leftPortion}>
                    <Text style={ styles.userName }>{displayName}</Text>
                    <Text style={ styles.message }>{lastMessage}</Text>
                </View>
                <Text style={styles.timeAgo}>{timeAgo}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 15
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    textContainer: {
        height: 60,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        marginLeft: 15,
        marginRight: 5,
        borderBottomColor: "gray",
        borderBottomWidth: 1
    },
    leftPortion: {
        flexDirection: "column",
    },
    timeAgo: {
        fontSize: 15,
        color: "gray",
    },
    userName: {
        fontSize: 20,
    },
    message: {
        fontSize: 15,
    }
})

export default Chat
