import React, { useLayoutEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebaseConfig';
import whatsappLogo from '../images/WhatsApp-Logo.png';
import { login } from '../redux/user/UserActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function Login() {

    const dispatch = useDispatch();
    const navigation = useNavigation()
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
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Email"
                        placeholderTextColor="#FFFFFF"
                        selectionColor="#FFFFFF"
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
                    />
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCompleteType="password"
                        placeholder="Password"
                        placeholderTextColor="#FFFFFF"
                        selectionColor="#FFFFFF"
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                    />
                </View>
                <View style={ styles.buttonsContainer }>
                    <TouchableOpacity onPress={processLogin}>
                        <Text style={styles.button}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.button}>Sign up</Text>
                    </TouchableOpacity>
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
    headerTitle: {
        color: "#FFFFFF", 
        fontSize: 20, 
        margin: 20
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
        backgroundColor: '#25D366',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        alignSelf: 'stretch',
        color: "#FFFFFF",
        fontSize: 17
    },
    buttonsContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
        width: 175
    },
    button: {
        backgroundColor: "#25D366",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        color: "#FFFFFF",
        fontSize: 17
    }
})

export default Login
