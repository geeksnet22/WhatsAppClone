import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Chat({ displayName, photoURL, lastMessage, timestamp, uid }) {
  const navigation = useNavigation();

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
      onPress={() =>
        navigation.navigate("ChatWindow", {
          displayName: displayName,
          photoURL: photoURL,
          uid: uid,
        })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: photoURL,
          }}
        />
        <View style={styles.textContainer}>
          <View style={styles.leftPortion}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.message}>{lastMessage}</Text>
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
