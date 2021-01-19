import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Chat from './Chat';
import { db } from './firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

function Chats({ navigation }) {

    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection("chats").onSnapshot((snapshot) => (
            snapshot.forEach((doc) => (
                setChats({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ))
    }, [])

    const renderItem = ({ item }) => (
        <Chat 
            displayName={item.data.name} 
            photoURL={item.data.photoURL} 
            lastMessage="Last Message"
            timeAgo={item.data.timestamp} />
    )

    return (
        <>
            <SafeAreaView>
                <FlatList 
                    style={styles.container}
                    data={chats}
                    renderItem={renderItem}
                    keuExtractor={item => item.id}
                />
            </SafeAreaView>
            <View style={styles.createMessage}>
                <TouchableOpacity
                    onPress={() =>  navigation.navigate('Contacts')}
                >
                    <MaterialCommunityIcons 
                        name="message-text" 
                        size={24} 
                        color="#ffffff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    createMessage: {
        padding: 15, 
        backgroundColor: "#25D366", 
        height: 60, 
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        alignSelf: "flex-end",
        flexDirection: "row",
        bottom: 20,
        right: 20
    }
})

export default Chats
