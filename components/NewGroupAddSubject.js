import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function NewGroupAddSubject() {

    const navigation = useNavigation();
    const route = useRoute();
    const iconURL = useState("");
    const groupSubject = useState("");

    const HeaderTitle = () => (
        <View>
            <Text style={styles.headerTitlePrimary}>New group</Text>
            <Text style={styles.headerTitleSecondary}>Add subject</Text>
        </View>
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: <HeaderTitle />,
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.infoInputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Enter group icons URL..."
                    placeholderTextColor= "black"
                    selectionColor="black"
                    defaultValue={iconURL}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Type group subject here..."
                    placeholderTextColor= "black"
                    selectionColor="black"
                    defaultValue={groupSubject}
                />
                <Text style={styles.dispclaimerText}>Provide a group subject and optional group icon</Text>
            </View>
            <TouchableOpacity style={styles.doneIconContainer}>
                <MaterialIcons 
                    name="done" 
                    size={30} 
                    color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.participantsContainer}>
                <Text>Participants: </Text>
                <Text>{route.params?.selectedUsers.length}</Text>
            </View>
            <View style={styles.usersInfoContainer}>
                {route.params?.selectedUsers.map((contact) => (
                    <View style={styles.userItemContainer}>
                        <Image 
                            style={styles.userAvatar}
                            source={{
                                uri: contact.data.photoURL
                            }}
                        />
                        <Text>{contact.data.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    headerTitlePrimary: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    headerTitleSecondary: {
        fontSize: 15,
        color: "#FFFFFF"
    },
    infoInputContainer: {
        backgroundColor: "#FFFFFF",
        paddingBottom: 20
    },
    dispclaimerText: {
        color: "gray",
        padding: 10
    },
    textInput: {
        padding: 10,
        borderRadius: 10,
        alignSelf: 'stretch',
        color: "black",
        fontSize: 17,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    doneIconContainer: {
        backgroundColor: "#25D366",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: -25
    },
    participantsContainer: {
        flexDirection: "row",
        paddingHorizontal: 10
    },
    usersInfoContainer: {
        flexDirection: "row",
        marginVertical: 10,
        flexWrap: "wrap"
    },
    userItemContainer: {
        alignItems: "center", 
        alignSelf: "flex-start",
        margin: 10
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "gray"
    }
})

export default NewGroupAddSubject
