import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Button, Alert, Text, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth, db } from './firebaseConfig';
import whatsappLogo from './images/WhatsApp-Logo.png';
import { login } from './redux/UserActions';
import firebase from 'firebase';

function Login() {

    const dispatch = useDispatch()

    const [fullName, setFullName] = useState("");
    const [photoURL, setPhotoURL] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const processLogin = () => {
        auth.signInWithEmailAndPassword(email.trim(), password)
            .then(user => {
                db.collection("users").doc(user.user.uid).get()
                    .then((doc) => {
                        const data = doc.data();
                        dispatch(
                            login({
                                name: data.name,
                                photoURL: data.photoURL,
                                email: user.user.email,
                                uid: user.user.uid
                            })
                        )
                    })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    const processSignup = () => {
        if ( !fullName ) {
            Alert.alert("Full name required")
            return;
        }
        auth.createUserWithEmailAndPassword(email.trim(), password)
            .then(user => {
                dispatch(
                    login({
                        name: fullName,
                        photoURL: photoURL,
                        email: user.user.email,
                        uid: user.user.uid
                    })
                )
                db.collection("users").doc(user.user.uid).set({
                    name: fullName,
                    photoURL: photoURL,
                    email: user.user.email,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
            .catch((error) => {
                Alert.alert(error.message)
            })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={whatsappLogo}
                />
                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Full name (Required for sign up)"
                        onChangeText={fullName => setFullName(fullName)}
                        defaultValue={fullName}
                    />
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Profile Photo URL"
                        onChangeText={photoURL => setPhotoURL(photoURL)}
                        defaultValue={photoURL}
                    />
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Email (Not Authenticated)"
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
                    />
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCompleteType="password"
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                    />
                </View>
                <View style={{ 
                                flexDirection: "row", 
                                justifyContent: "space-between",
                                width: 150
                            }}>
                    <Button 
                        color="#25D366"
                        title="Login"
                        onPress={processLogin}
                    />
                    <Button 
                        color="#25D366"
                        title="Sign up"
                        onPress={processSignup}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center", 
        alignItems: "center",
        alignSelf: 'stretch',
    },
    logo: {
        height: 100,
        width: 100,
        marginTop: 40,
        marginBottom: 40
    },
    formContainer: {
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 20
    },
    textInput: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        alignSelf: 'stretch',
        height: 50
    }
})

export default Login
