import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Chat from './Chat';
import { db } from '../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setCurrentTab } from '../redux/currentTab/CurrentTabActions';

function Chats({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [chats, setChats] = useState([])

    useFocusEffect(
        useCallback(
            () => {
                dispatch(setCurrentTab("CHATS"))
            },[],
        )
    )

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
        <View style={styles.container}>
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
    container: {
        flex: 1
    },
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
