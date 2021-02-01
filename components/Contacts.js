import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function Contacts() {

    const navigation = useNavigation();
    const [contacts, setContacts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Select contact",
            headerRight: () => 
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerRightIcon}>
                        <Ionicons 
                            name="search" 
                            size={20} 
                            color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerRightIcon}>
                        <Entypo
                            name="dots-three-vertical" 
                            size={20} 
                            color="#FFFFFF" 
                            onPress={() => {}}/>
                    </TouchableOpacity>
                </View>
        })
    }, [navigation])

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setContacts(
                snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )).concat({"item": "newGroup"}))
        ));
    }, [])

    const NewGroupItem = () => (
        <TouchableOpacity style={styles.item} onPress={() => {}}>
            <View style={styles.newGroupAvatar}>
                <MaterialIcons 
                    name="group" 
                    size={24} 
                    color="white" />
            </View>
            <Text style={styles.displayName}>New group</Text>
        </TouchableOpacity>
    )


    const Item = ({ displayName, photoURL, uid }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate("ChatWindow", {
                displayName: displayName,
                photoURL: photoURL,
                uid: uid
            })}
        >
            <View style={styles.item}>
                <Image 
                    style={styles.avatar}
                    source={{
                        uri: photoURL
                    }}
                />
                <Text style={styles.displayName}>{displayName}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderContact = ({ item }) => {
        if (item.item) {
            return item.item === "newGroup" ? <NewGroupItem /> : <></>
        }
        return <Item 
                    displayName={item.data.name} 
                    photoURL={item.data.photoURL} 
                    uid={item.id}
                />
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    data={contacts.reverse()}
                    renderItem={renderContact}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRight: {
        flexDirection: "row"
    },
    headerRightIcon: {
        padding: 12
    },
    newGroupAvatar: {
        backgroundColor: "#25D366",
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center"
    },
    displayName: {
        fontSize: 20,
        marginLeft: 15
    }
})

export default Contacts
