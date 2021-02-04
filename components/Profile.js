import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.avatar}
          source={{
            uri: route.params?.photoURL,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nameContainer}>
        <Ionicons
          style={styles.nameIcon}
          name="person"
          size={20}
          color="#128C7E"
        />
        <View style={styles.nameRightItem}>
          <View style={styles.nameInfoContainer}>
            <View>
              <Text style={styles.textItemTitle}>Name</Text>
              <Text>{route.params?.name}</Text>
            </View>
            <MaterialCommunityIcons name="pencil" size={20} color="gray" />
          </View>
          <Text style={styles.nameDisclaimer}>
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutContainer}>
        <AntDesign
          style={styles.icon}
          name="infocirlceo"
          size={20}
          color="#128C7E"
        />
        <View style={styles.aboutRightItem}>
          <View>
            <Text style={styles.textItemTitle}>About</Text>
            <Text>Battery about to die</Text>
          </View>
          <MaterialCommunityIcons name="pencil" size={20} color="gray" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.phoneContainer}>
        <MaterialIcons
          style={styles.icon}
          name="email"
          size={20}
          color="#128C7E"
        />
        <View style={styles.phoneTextContainer}>
          <Text style={styles.textItemTitle}>E-mail</Text>
          <Text>{user.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 20,
  },
  nameIcon: {
    marginTop: 8,
    marginLeft: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  nameRightItem: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
  },
  nameInfoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textItemTitle: {
    color: "gray",
  },
  nameDisclaimer: {
    paddingVertical: 15,
    color: "gray",
  },
  icon: {
    marginLeft: 20,
  },
  aboutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  aboutRightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  phoneContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneTextContainer: {
    marginLeft: 20,
  },
});

export default Profile;
