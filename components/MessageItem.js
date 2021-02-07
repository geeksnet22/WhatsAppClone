import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function MessageItem({ item }) {
  const user = useSelector((state) => state.user.user);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (item.isGroup) {
      item.userDataPromise.then((userData) => setUserName(userData.name));
    }
  }, []);

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
        item.isGroup
          ? item.data.uid === user.uid
            ? styles.sentMessage
            : styles.receivedMessage
          : item.data.type === "sent"
          ? styles.sentMessage
          : styles.receivedMessage
      }
    >
      <View>
        {item.isGroup && item.data.uid !== user.uid && (
          <Text style={styles.groupUserName}>{userName.split(" ")[0]}</Text>
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
}

const styles = StyleSheet.create({
  groupUserName: {
    color: "#128C7E",
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
});

export default MessageItem;
