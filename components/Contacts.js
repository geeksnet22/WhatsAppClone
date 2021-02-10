import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

function Contacts() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Select contact",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerRightIcon}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerRightIcon}>
            <Entypo
              name="dots-three-vertical"
              size={20}
              color="#FFFFFF"
              onPress={() => {}}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const userUnsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setContacts(
        [{ newGroupIcon: "newGroup" }].concat(
          snapshot.docs
            .filter((doc) => doc.id !== user.uid)
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
              isGroup: false,
            }))
        )
      );
    });
    const groupUnsubscribe = db
      .collection(`users/${user.uid}/groups`)
      .onSnapshot((snapshot) =>
        setGroups(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            groupDataPromise: db
              .collection("groups")
              .doc(doc.id)
              .get()
              .then((groupDoc) => groupDoc.data()),
            isGroup: true,
          }))
        )
      );
    return () => {
      userUnsubscribe();
      groupUnsubscribe();
    };
  }, []);

  const NewGroupItem = () => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("NewGroup")}
    >
      <View style={styles.newGroupAvatar}>
        <MaterialIcons name="group" size={24} color="white" />
      </View>
      <Text style={styles.displayName}>New group</Text>
    </TouchableOpacity>
  );

  const renderContact = ({ item }) => {
    if (item.newGroupIcon) {
      return <NewGroupItem />;
    } else if (item.groupDataPromise) {
      return (
        <ContactItem
          groupDataPromise={item.groupDataPromise}
          uid={item.id}
          isGroup={true}
        />
      );
    } else {
      return (
        <ContactItem
          userDisplayName={item.data.name}
          userPhotoURL={item.data.photoURL}
          uid={item.id}
          isGroup={false}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={contacts.concat(groups)}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
  },
  headerRightIcon: {
    padding: 12,
  },
  newGroupAvatar: {
    backgroundColor: "#25D366",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  displayName: {
    fontSize: 20,
    marginLeft: 15,
  },
});

export default Contacts;
