import React, { useState } from "react";
import { Image, StyleSheet, View, Text, Alert } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import whatsappLogo from "../images/WhatsApp-Logo.png";

function Signup() {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const processSignup = () => {
    if (!fullName) {
      Alert.alert("Full name required");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        dispatch(
          login({
            name: fullName,
            photoURL: photoURL,
            email: user.user.email,
            uid: user.user.uid,
          })
        );
        db.collection("users").doc(user.user.uid).set({
          name: fullName,
          photoURL: photoURL,
          email: user.user.email,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={whatsappLogo} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Full name (Required for sign up)"
            placeholderTextColor="#FFFFFF"
            selectionColor="#FFFFFF"
            onChangeText={(fullName) => setFullName(fullName)}
            defaultValue={fullName}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Profile Photo URL"
            placeholderTextColor="#FFFFFF"
            selectionColor="#FFFFFF"
            onChangeText={(photoURL) => setPhotoURL(photoURL)}
            defaultValue={photoURL}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCompleteType="email"
            placeholder="Email (Anything in email format)"
            placeholderTextColor="#FFFFFF"
            selectionColor="#FFFFFF"
            onChangeText={(email) => setEmail(email)}
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
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
          />
        </View>
        <TouchableOpacity onPress={processSignup}>
          <Text style={styles.button}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 40,
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignSelf: "stretch",
    color: "#FFFFFF",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#25D366",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    color: "#FFFFFF",
    fontSize: 17,
  },
});

export default Signup;
