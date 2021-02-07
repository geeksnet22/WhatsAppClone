import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { useSelector } from "react-redux";
import firebase from "firebase";

function NewGroupAddSubject() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const route = useRoute();
  const [iconURL, setIconURL] = useState("");
  const [groupSubject, setGroupSubject] = useState("");

  const HeaderTitle = () => (
    <View>
      <Text style={styles.headerTitlePrimary}>New group</Text>
      <Text style={styles.headerTitleSecondary}>Add subject</Text>
    </View>
  );

  const HeaderLeft = () => {
    if (Platform.OS === "ios") {
      return (
        <TouchableOpacity
          style={styles.iosHeaderLeftContainer}
          onPress={() => navigation.navigate("NewGroup")}
        >
          <Ionicons name="ios-chevron-back" size={35} color="#FFFFFF" />
          <Text style={styles.headerTitleSecondary}>New Group</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.androidHeaderLeftContainer}
          onPress={() => navigation.navigate("NewGroup")}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: <HeaderTitle />,
      headerLeft: () => <HeaderLeft />,
    });
  }, [navigation]);

  const createNewGroup = () => {
    if (!groupSubject) return;
    const groupId = `${user.uid}_${groupSubject.replace(/\s/g, "")}`;
    const docRef = db.collection("groups").doc(groupId);
    // if the group already exists
    docRef.get().then((doc) => {
      if (doc.exists) {
        return;
      }
    });
    docRef.set({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      subject: groupSubject,
      iconURL: iconURL,
    });

    const participantsRef = db.collection(`groups/${groupId}/participants`);
    // group admin
    participantsRef.doc(user.uid).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection(`users/${user.uid}/groups`).doc(groupId).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // group participants
    route.params?.selectedUsers.forEach((participant) => {
      participantsRef.doc(participant.id).set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(`users/${participant.id}/groups`).doc(groupId).set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter group icons URL..."
          placeholderTextColor="black"
          selectionColor="black"
          defaultValue={iconURL}
          onChangeText={(iconURL) => setIconURL(iconURL)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Type group subject here..."
          placeholderTextColor="black"
          selectionColor="black"
          defaultValue={groupSubject}
          onChangeText={(groupSubject) => setGroupSubject(groupSubject)}
        />
        <Text style={styles.dispclaimerText}>
          Provide a group subject and optional group icon
        </Text>
      </View>
      <TouchableOpacity
        style={styles.doneIconContainer}
        onPress={createNewGroup}
      >
        <MaterialIcons name="done" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.participantsContainer}>
        <Text>Participants: </Text>
        <Text>{route.params?.selectedUsers.length}</Text>
      </View>
      <View style={styles.usersInfoContainer}>
        {route.params?.selectedUsers.map((contact) => (
          <View key={contact.id} style={styles.userItemContainer}>
            <Image
              style={styles.userAvatar}
              source={{
                uri: contact.data.photoURL,
              }}
            />
            <Text>{contact.data.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitlePrimary: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  headerTitleSecondary: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  iosHeaderLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  androidHeaderLeftContainer: {
    marginLeft: 10,
  },
  infoInputContainer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  dispclaimerText: {
    color: "gray",
    padding: 10,
  },
  textInput: {
    padding: 5,
    borderRadius: 10,
    alignSelf: "stretch",
    color: "black",
    fontSize: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
    marginTop: -25,
  },
  participantsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  usersInfoContainer: {
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  userItemContainer: {
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "gray",
  },
});

export default NewGroupAddSubject;
