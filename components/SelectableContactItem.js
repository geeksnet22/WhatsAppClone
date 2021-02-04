import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function SelectableContactItem({
  onSelectionChange,
  displayName,
  photoURL,
  uid,
  isSelected,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelectionChange(uid, !isSelected);
      }}
    >
      <View style={styles.item}>
        <View style={{ width: 50, flexDirection: "row" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: photoURL,
            }}
          />
          {isSelected && (
            <MaterialCommunityIcons
              style={styles.tickIcon}
              name="checkbox-marked-circle"
              size={20}
              color="#128C7E"
            />
          )}
        </View>
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
  tickIcon: {
    marginLeft: -15,
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  displayName: {
    fontSize: 20,
    marginLeft: 15,
  },
});

export default SelectableContactItem;
