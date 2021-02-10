import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Chat from "./Chat";
import { db } from "../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setCurrentTab } from "../redux/currentTab/CurrentTabActions";

function Chats({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentTab("CHATS"));
    }, [])
  );

  useEffect(() => {
    const userUnsubscribe = db
      .collection(`users/${user.uid}/chats`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            messagedUserDataPromise: db
              .collection("users")
              .doc(doc.data().lastUser)
              .get()
              .then((userDoc) => userDoc.data()),
          }))
        )
      );
    const groupUnsubscribe = db
      .collection(`users/${user.uid}/groups`)
      .onSnapshot((userSnapshot) => {
        setGroups(
          userSnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            lastUserDataPromise: db
              .collection("users")
              .doc(doc.data().lastUser)
              .get()
              .then((userDoc) => userDoc.data()),
            groupDataPromise: db
              .collection("groups")
              .doc(doc.id)
              .get()
              .then((groupDoc) => groupDoc.data()),
          }))
        );
      });
    return () => {
      userUnsubscribe();
      groupUnsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => {
    if (item.groupDataPromise) {
      return item.data.lastMessage ? (
        <Chat
          lastMessage={item.data.lastMessage}
          lastUserDataPromise={item.lastUserDataPromise}
          groupDataPromise={item.groupDataPromise}
          timestamp={item.data.timestamp}
          uid={item.id}
          isGroup={true}
        />
      ) : (
        <></>
      );
    } else {
      return (
        <Chat
          messagedUserDataPromise={item.messagedUserDataPromise}
          lastMessage={item.data.lastMessage}
          timestamp={item.data.timestamp}
          uid={item.id}
          isGroup={false}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={chats
            .concat(groups)
            .sort((a, b) =>
              a.data?.timestamp < b.data?.timestamp
                ? 1
                : b.data?.timestamp < a.data?.timestamp
                ? -1
                : 0
            )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View
        style={{
          bottom: 20,
          right: 20,
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="message-text"
              size={24}
              color="#ffffff"
            />
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
  iconContainer: {
    backgroundColor: "#25D366",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
  },
});

export default Chats;
