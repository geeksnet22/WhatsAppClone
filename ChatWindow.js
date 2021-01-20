import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { db } from './firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

function ChatWindow({ navigation, route }) {

    const user = useSelector(state => state.user.user)

    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState("")

    useEffect(() => {
        db.collection(`users/${user.uid}/chats/${route.params.uid}/messages`)
            .orderBy("timestamp", "desc").onSnapshot((snapshot) => (
                setMessages(snapshot.docs.reverse().map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
    }, [])

    const renderItem = ({ item }) => {
        return(
            <View style={item.data.type === "sent" 
                            ? styles.sentMessage : styles.receivedMessage}>
                <Text>{item.data.content}</Text>
            </View>
        )
    }

    const sendMessage = () => {
        if (!messageInput) {
            return;
        }
        // add message to current user's data
        db.collection(`users/${user.uid}/chats`).doc(route.params.uid)
            .set({
                lastMessage: messageInput,
                name: route.params.displayName,
                photoURL: route.params.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        // add message to sent user's data
        db.collection(`users/${route.params.uid}/chats`).doc(user.uid)
            .set({
                lastMessage: messageInput,
                name: user.name,
                photoURL: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        db.collection(`users/${user.uid}/chats/${route.params.uid}/messages`)
            .add({
                type: "sent",
                content: messageInput,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        db.collection(`users/${route.params.uid}/chats/${user.uid}/messages`)
            .add({
                type: "received",
                content: messageInput,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setMessageInput("");
    }

    return (
        <View style={{flex: 1, backgroundColor: "#ECE5DD"}}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Type a message"
                    onChangeText={ messageInput => setMessageInput(messageInput)}
                    defaultValue={messageInput}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <View style={styles.sendButton}>
                        <Ionicons name="send" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: "row",
        margin: 10
    },
    textInput: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginRight: 10,
        borderRadius: 20,
        fontSize: 15,
        padding: 5
    },
    sendButton: {
        backgroundColor: "#075E54",
        height: 45,
        width: 45,
        borderRadius: 22.5,
        justifyContent: "center",
        alignItems: "center"
    },
    sentMessage: {
        padding: 8,
        backgroundColor: "#DCF8C6",
        borderRadius: 10,
        alignSelf: "flex-end",
        margin: 5,
        fontSize: 15,
        maxWidth: "80%"
    },
    receivedMessage: {
        padding: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignSelf: "flex-start",
        margin: 5,
        fontSize: 15,
        maxWidth: "80%"
    }
})

export default ChatWindow
