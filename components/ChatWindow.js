import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
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
import MessageItem from "./MessageItem";

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
            uri: route.params?.isGroup
              ? route.params?.iconURL
              : route.params?.photoURL,
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
      const unsubscribe = db
        .collection(`groups/${route.params?.groupId}/chats`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGroupMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              isGroup: true,
              userDataPromise: db
                .collection("users")
                .doc(doc.data().uid)
                .get()
                .then((doc) => doc.data()),
            }))
          )
        );
      return () => unsubscribe();
    } else {
      const unsubscribe = db
        .collection(`users/${user.uid}/chats/${route.params?.uid}/messages`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              isGroup: false,
            }))
          );
          db.collection(`users/${route.params?.uid}/chats/${user.uid}/messages`)
            .get()
            .then((snapshot) =>
              snapshot.forEach((doc) =>
                doc.ref.update({
                  seen: true,
                })
              )
            );
        });
      return () => unsubscribe();
    }
  }, [db]);

  const sendMessage = () => {
    if (!messageInput) {
      return;
    }

    if (route.params?.isGroup) {
      // add message to collection
      db.collection(`groups/${route.params?.groupId}/chats`).add({
        content: messageInput,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(`groups/${route.params?.groupId}/participants`)
        .get()
        .then((snapshot) =>
          snapshot.docs.forEach((doc) =>
            db
              .collection(`users/${doc.id}/groups`)
              .doc(route.params?.groupId)
              .update({
                lastMessage: messageInput,
                lastUser: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
          )
        );
    } else {
      // add message to current user's data
      db.collection(`users/${user.uid}/chats`).doc(route.params?.uid).set({
        lastMessage: messageInput,
        seen: false,
        lastUser: route.params?.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      db.collection(
        `users/${user.uid}/chats/${route.params?.uid}/messages`
      ).add({
        type: "sent",
        content: messageInput,
        seen: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // add message to receiving user's data
      db.collection(`users/${route.params?.uid}/chats`).doc(user.uid).set({
        lastMessage: messageInput,
        lastUser: user.uid,
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

  const renderItem = ({ item }) => {
    return <MessageItem item={item} />;
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
});

export default ChatWindow;
