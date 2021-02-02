import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, Platform, Alert, ToastAndroid } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { db } from '../firebaseConfig';
import SelectableContactItem from './SelectableContactItem';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

function NewGroup() {

    const navigation = useNavigation();
    const [contacts, setContacts] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const HeaderTitle = () => (
        <View>
            <Text style={styles.headerTitlePrimary}>New Group</Text>
            <Text 
                style={styles.headerTitleSecondary}>
                    {selectedUsers.length > 0 
                        ? `${selectedUsers.length} of ${contacts.length} selected` 
                            : `Add participants`}
            </Text>
        </View>
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: <HeaderTitle />
        })
    }, [navigation, selectedUsers])

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setContacts(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                ))
            )
        ))
    }, [])

    const handleSelectionChange = (uid, isSelected) => {
        const tempArray = []
        if (isSelected) {
            tempArray.push(contacts.filter((contact) => (
                contact.id === uid
            ))[0])
        }
        else {
            let index;
            for (index = 0; index < selectedUsers.length; index++) {
                if ( selectedUsers[index].id === uid ) {
                    break;
                }
            }
            if (index > -1) {
                selectedUsers.splice(index, 1);
            }
        }
        setSelectedUsers(selectedUsers.concat(tempArray));
    }

    const renderContact = ({ item }) => (
        <SelectableContactItem 
            onSelectionChange={(uid, isSelected) => 
                                    handleSelectionChange(uid, isSelected)}
            displayName={item.data.name} 
            photoURL={item.data.photoURL} 
            uid={item.id}
            isSelected={selectedUsers.filter(
                (contact) => (contact.id === item.id)).length > 0} />
    )

    const SelectedContactItem = ({ displayName, photoURL, uid }) => (
        <TouchableOpacity 
            style={styles.selectedItemContainer}
            onPress={() => {
                let index;
                for (index = 0; index < selectedUsers.length; index++) {
                    if ( selectedUsers[index].id === uid ) {
                        break;
                    }
                }
                if (index > -1) {
                    selectedUsers.splice(index, 1);
                }
                setSelectedUsers(selectedUsers.concat([]))
            }}>
            <View style={styles.selectedUserImageContainer}>
                <Image 
                    style={styles.selectedUserAvatar}
                    source={{
                        uri: photoURL
                    }}
                />
                <Entypo 
                    style={styles.crossIcon}
                    name="circle-with-cross" 
                    size={20} 
                    color="gray" />
            </View>
            <Text style={styles.selectedUserName}>{displayName.split(" ")[0]}</Text>
        </TouchableOpacity>
    )

    const renderSelectedContact = ({ item }) => (
        <SelectedContactItem 
            displayName={item.data.name}
            photoURL={item.data.photoURL}
            uid={item.id}
        />
    )

    return (
        <View style={styles.container}>
            {selectedUsers.length > 0 && 
                <SafeAreaView style={styles.selectedUsersContainer}>
                    <FlatList 
                        horizontal={true}
                        data={selectedUsers}
                        renderItem={renderSelectedContact}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            }
            <SafeAreaView>
                <FlatList 
                    data={contacts}
                    renderItem={renderContact}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <View style={styles.floatingButtonContainer}>
                <TouchableOpacity onPress={() => {
                        if (selectedUsers.length === 0) {
                            Platform.OS === 'ios' 
                                ? Alert.alert("At least 1 contact must be selected") 
                                    : ToastAndroid.show("At least 1 contact must be selected", ToastAndroid.SHORT);
                        }
                        else {
                            navigation.navigate("NewGroupAddSubject", {
                                selectedUsers: selectedUsers
                            })
                        }
                    }}>
                <View style={styles.floatingButton}>
                    <Feather 
                        name="arrow-right" 
                        size={24} 
                        color="#FFFFFF" />
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
    headerTitlePrimary: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    headerTitleSecondary: {
        fontSize: 15,
        color: "#FFFFFF"
    },
    selectedUsersContainer: {
        borderBottomColor: "gray",
        borderBottomWidth: 0.2,
    },
    selectedItemContainer: {
        padding: 10,
        alignItems: "center"
    },
    selectedUserImageContainer: {
        flexDirection: "row"
    },
    selectedUserAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "gray"
    },
    crossIcon: {
        alignSelf: "flex-end",
        marginLeft: -20,
        backgroundColor: "#FFFFFF",
        borderRadius: 10
    },
    selectedUserName: {
        color: "gray",
        fontSize: 15
    },
    floatingButtonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    floatingButton: {
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

export default NewGroup
