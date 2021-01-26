import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Chat from './Chat';
import { db } from './firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

function Chats({ navigation }) {

    const user = useSelector(state => state.user.user)
    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection(`/users/${user.uid}/chats`)
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => (
                setChats(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                ))
            )))
    }, [])

    const renderItem = ({ item }) => (
                <Chat 
                    displayName={item.data.name} 
                    photoURL={item.data.photoURL} 
                    lastMessage={item.data.lastMessage}
                    timestamp={item.data.timestamp} 
                    uid={item.id}
                />
    )

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList 
                    data={chats}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <View style={{
                        bottom: 20,
                        right: 20,
                        position: "absolute"
                    }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Contacts')}
                >
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons 
                            name="message-text"
                            size={24}
                            color="#ffffff" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: "#25D366", 
        height: 60, 
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        flexDirection: "row"
    }
})

export default Chats
