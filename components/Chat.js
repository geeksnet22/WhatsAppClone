import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Chat({
  messagedUserDataPromise,
  lastUserDataPromise,
  groupDataPromise,
  lastMessage,
  timestamp,
  uid,
  isGroup,
}) {
  const navigation = useNavigation();
  const [messagedUserName, setMessagedUserName] = useState("");
  const [messagedUserPhotoURL, setMessagedUserPhotoURL] = useState("");
  const [groupSubject, setGroupSubject] = useState("");
  const [groupIconURL, setGroupIconURL] = useState("");
  const [lastUserUserName, setLastUserUserName] = useState("");

  useEffect(() => {
    if (isGroup) {
      groupDataPromise.then((groupData) => {
        setGroupSubject(groupData.subject);
        setGroupIconURL(groupData.iconURL);
      });
      lastUserDataPromise.then((lastUserData) => {
        setLastUserUserName(lastUserData.name);
      });
    } else {
      messagedUserDataPromise.then((userData) => {
        setMessagedUserName(userData.name);
        setMessagedUserPhotoURL(userData.photoURL);
      });
    }
  }, [groupDataPromise, lastUserDataPromise, messagedUserDataPromise]);

  const getTimeAgo = () => {
    if (!timestamp) {
      return;
    }
    const millisSince = Date.now() - timestamp.toMillis();
    const date = timestamp.toDate();
    if (millisSince < 8.64e7) {
      var hour = date.getHours();
      var minute = date.getMinutes();
      const ampm = hour >= 12 ? "pm" : "am";
      hour = hour % 12;
      minute = minute < 10 ? "0" + minute : minute;
      return `${hour}:${minute} ${ampm}`;
    } else if (millisSince < 1.728e8) {
      return "yesterday";
    } else {
      return `${date.getFullYear()}-${
        parseInt(date.getMonth()) + 1
      }-${date.getDate()}`;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (groupSubject) {
          navigation.navigate("ChatWindow", {
            groupSubject: groupSubject,
            iconURL: groupIconURL,
            groupId: uid,
            isGroup: true,
          });
        } else {
          navigation.navigate("ChatWindow", {
            displayName: messagedUserName,
            photoURL: messagedUserPhotoURL,
            uid: uid,
            isGroup: false,
          });
        }
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: isGroup ? groupIconURL : messagedUserPhotoURL,
          }}
        />
        <View style={styles.textContainer}>
          <View style={styles.leftPortion}>
            <Text style={styles.userName}>
              {isGroup ? groupSubject : messagedUserName}
            </Text>
            <Text style={styles.message}>
              {isGroup
                ? `${lastUserUserName?.split(" ")[0]}: ${lastMessage}`
                : lastMessage}
            </Text>
          </View>
          <Text style={styles.timeAgo}>{getTimeAgo()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "gray",
  },
  textContainer: {
    height: 80,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
  },
  leftPortion: {
    flexDirection: "column",
    maxWidth: "80%",
  },
  userName: {
    fontSize: 20,
  },
  message: {
    fontSize: 15,
    color: "gray",
  },
  timeAgo: {
    fontSize: 14,
    color: "gray",
    alignSelf: "flex-start",
    marginTop: 20,
  },
});

export default Chat;
