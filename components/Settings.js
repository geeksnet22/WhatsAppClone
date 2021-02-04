import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Settings() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.userInfoContainer}
        onPress={() =>
          navigation.navigate("Profile", {
            photoURL: user.photoURL,
            name: user.name,
          })
        }
      >
        <Image
          style={styles.avatar}
          source={{
            uri: user.photoURL,
          }}
        />
        <View style={styles.userInfoTextContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userStatus}>Battery about to die</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItemContainer}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons
              name="key-variant"
              size={20}
              color="#128C7E"
            />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.primaryText}>Account</Text>
            <Text style={styles.secondaryText}>
              Privacy, security, changeNumber
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons
              name="message-text"
              size={20}
              color="#128C7E"
            />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.primaryText}>Chats</Text>
            <Text style={styles.secondaryText}>
              Theme, wallpapers, chat history
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="notifications" size={20} color="#128C7E" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.primaryText}>Notifications</Text>
            <Text style={styles.secondaryText}>
              Message, group and call tones
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <View style={styles.menuIconContainer}>
            <MaterialIcons name="data-usage" size={20} color="#128C7E" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.primaryText}>Storage and Data</Text>
            <Text style={styles.secondaryText}>
              Network usage, auto-download
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lastItemContainer}>
          <View style={styles.lastMenuIconContainer}>
            <Feather name="help-circle" size={20} color="#128C7E" />
          </View>
          <View style={styles.lastMenuTextContainer}>
            <Text style={styles.primaryText}>Help</Text>
            <Text style={styles.secondaryText}>
              Help centre, contact us, privacy policy
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <View style={styles.menuIconContainer}>
            <FontAwesome5 name="user-friends" size={20} color="#128C7E" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.primaryText}>Invite a friend</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.logo}>
          <Text style={styles.logoTextSecondary}>from</Text>
          <Text style={styles.logoTextPrimary}>FACEBOOK</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "gray",
  },
  userInfoTextContainer: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 25,
  },
  userStatus: {
    color: "gray",
  },
  menuContainer: {
    paddingVertical: 15,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 20,
  },
  lastItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingLeft: 20,
  },
  menuIconContainer: {},
  lastMenuIconContainer: {
    marginTop: 12,
  },
  menuTextContainer: {
    marginLeft: 25,
    flex: 1,
  },
  lastMenuTextContainer: {
    marginLeft: 25,
    flex: 1,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
    paddingBottom: 30,
  },
  primaryText: {
    fontSize: 17,
  },
  secondaryText: {
    fontSize: 14,
    color: "gray",
  },
  logo: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoTextPrimary: {
    textAlign: "center",
    letterSpacing: 3,
  },
  logoTextSecondary: {
    textAlign: "center",
    color: "gray",
  },
});

export default Settings;
