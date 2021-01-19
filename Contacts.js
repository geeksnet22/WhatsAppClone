import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, View, Image, Text, StyleSheet, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db } from './firebaseConfig'

function Contacts({ navigation }) {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setContacts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ));
    }, [])

    const Item = ({ displayName, photoURL }) => (
        <TouchableOpacity onPress={() => console.log("GSB")}>
            <View style={styles.item}>
                <Image 
                    style={styles.avatar}
                    source={{
                        uri: photoURL
                    }}
                />
                <Text style={{ 
                                fontSize: 20,
                                marginLeft: 15
                            }}>{displayName}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderContact = ({ item }) => {
        return <Item 
                    displayName={item.data.name} 
                    photoURL={item.data.photoURL} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderContact}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "gray"
    }
})

export default Contacts
