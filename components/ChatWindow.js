import React, { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { db } from "../firebaseConfig";
import firebase from "firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

function ChatWindow() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const ChatWindowLeftHeader = () => (
    <View style={styles.chatWindowLeftHeader}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back-sharp" size={25} color="#FFFFFF" />
        <Image
          style={styles.userAvatar}
          source={{
            uri: route.params?.photoURL,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 20,
        }}
      >
        {route.params?.isGroup
          ? route.params?.groupSubject
          : route.params?.displayName}
      </Text>
    </View>
  );

  const ChatWindowRightHeader = () => (
    <View style={styles.chatWindowRightHeader}>
      <FontAwesome5
        style={{ padding: 12 }}
        name="video"
        size={20}
        color="#FFFFFF"
      />
      <Ionicons style={{ padding: 12 }} name="call" size={20} color="#FFFFFF" />
      <Entypo
        style={{ padding: 12 }}
        name="dots-three-vertical"
        size={20}
        color="#FFFFFF"
      />
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => <ChatWindowLeftHeader />,
      headerRight: () => <ChatWindowRightHeader />,
    });
  }, []);

  useEffect(() => {
    if (route.params?.isGroup) {
      db.collection(`groups/${route.params?.groupId}/chats`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGroupMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      db.collection(`users/${user.uid}/chats/${route.params?.uid}/messages`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, []);

  const renderItem = ({ item }) => {
    const getTime = (timestamp) => {
      if (!timestamp) {
        return;
      }
      const date = timestamp.toDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      const ampm = hour >= 12 ? "pm" : "am";
      hour = hour % 12;
      minute = minute < 10 ? "0" + minute : minute;
      return `${hour}:${minute} ${ampm}`;
    };

    return (
      <View
        style={
          route.params?.isGroup
            ? item.data.uid === user.uid
              ? styles.sentMessage
              : styles.receivedMessage
            : item.data.type === "sent"
            ? styles.sentMessage
            : styles.receivedMessage
        }
      >
        <View>
          {route.params?.isGroup && item.data.uid !== user.uid && (
            <Text style={styles.groupUserName}>
              {item.data.name.split(" ")[0]}
            </Text>
          )}
          <Text
            style={{
              fontSize: 15,
              marginRight: 70,
            }}
          >
            {item.data.content}
          </Text>
          <Text
            style={{
              color: "gray",
              alignSelf: "flex-end",
              marginTop: -15,
            }}
          >
            {getTime(item.data.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (!messageInput) {
      return;
    }
    if (route.params?.isGroup) {
      // add message to collection
      db.collection(`groups/${route.params?.groupId}/chats`).add({
        content: messageInput,
        name: user.name,
        photoURL: user.photoURL,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(`groups/${route.params?.groupId}/participants`).onSnapshot(
        (snapshot) =>
          snapshot.docs.forEach((doc) =>
            db
              .collection(`users/${doc.id}/groups`)
              .doc(route.params?.groupId)
              .update({
                lastMessage: messageInput,
                lastUser: user.name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
          )
      );
    } else {
      // add message to current user's data
      db.collection(`users/${user.uid}/chats`).doc(route.params?.uid).set({
        lastMessage: messageInput,
        name: route.params?.displayName,
        photoURL: route.params?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // add message to sent user's data
      db.collection(`users/${route.params?.uid}/chats`).doc(user.uid).set({
        lastMessage: messageInput,
        name: user.name,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(
        `users/${user.uid}/chats/${route.params?.uid}/messages`
      ).add({
        type: "sent",
        content: messageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(
        `users/${route.params?.uid}/chats/${user.uid}/messages`
      ).add({
        type: "received",
        content: messageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setMessageInput("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          inverted
          data={route.params?.isGroup ? groupMessages : messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          onChangeText={(messageInput) => setMessageInput(messageInput)}
          defaultValue={messageInput}
        />
        <TouchableOpacity onPress={sendMessage}>
          <View style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWindowLeftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatWindowRightHeader: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  userAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "gray",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginRight: 10,
    borderRadius: 20,
    fontSize: 15,
    padding: 5,
  },
  sendButton: {
    backgroundColor: "#075E54",
    height: 45,
    width: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  sentMessage: {
    padding: 5,
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 5,
    fontSize: 15,
    maxWidth: "80%",
  },
  receivedMessage: {
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignSelf: "flex-start",
    margin: 5,
    fontSize: 15,
    maxWidth: "80%",
  },
  groupUserName: {
    color: "#128C7E",
  },
});

export default ChatWindow;
