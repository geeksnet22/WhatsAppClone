import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function ContactItem({
  groupDataPromise,
  uid,
  isGroup,
  userDisplayName,
  userPhotoURL,
}) {
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState(userDisplayName);
  const [photoURL, setPhotoURL] = useState(userPhotoURL);

  useEffect(() => {
    if (isGroup) {
      groupDataPromise.then((groupData) => {
        setDisplayName(groupData.subject);
        setPhotoURL(groupData.iconURL);
      });
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "ChatWindow",
          isGroup
            ? {
                groupSubject: displayName,
                iconURL: photoURL,
                groupId: uid,
                isGroup: isGroup,
              }
            : {
                displayName: displayName,
                photoURL: photoURL,
                uid: uid,
                isGroup: isGroup,
              }
        )
      }
    >
      <View style={styles.item}>
        <Image
          style={styles.avatar}
          source={{
            uri: photoURL,
          }}
        />
        <Text style={styles.displayName}>{displayName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  displayName: {
    fontSize: 20,
    marginLeft: 15,
  },
});

export default ContactItem;
