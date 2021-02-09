import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebaseConfig";
import { setName, setReduxPhotoURL } from "../redux/user/UserActions";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const route = useRoute();
  const [userName, setUserName] = useState(user.name);
  const [about, setAbout] = useState(route.params?.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [isInfoInputModalVisible, setIsInfoInputModalVisible] = useState(false);
  const [inputModalType, setInputModalInputType] = useState("name");
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [userName, about]);

  const InfoInputModal = () => (
    <View style={styles.infoInputModal}>
      <Text style={styles.infoInputModalText}>
        {inputModalType === "name"
          ? "Enter you name"
          : inputModalType === "about"
          ? "Add about"
          : "Add profile photo URL"}
      </Text>
      <TextInput
        ref={inputRef}
        style={styles.infoInputModalInput}
        onChangeText={
          inputModalType === "name"
            ? (userName) => setUserName(userName)
            : inputModalType === "about"
            ? (about) => setAbout(about)
            : (photoURL) => setPhotoURL(photoURL)
        }
        defaultValue={
          inputModalType === "name"
            ? userName
            : inputModalType === "about"
            ? about
            : photoURL
        }
        autoFocus={true}
      />
      <View style={styles.infoInputModalButtonsContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsInfoInputModalVisible(false);
            db.collection("users")
              .doc(user.uid)
              .get()
              .then((doc) =>
                inputModalType === "name"
                  ? setUserName(doc.data().name)
                  : inputModalType === "about"
                  ? setAbout(doc.data().about ? doc.data().about : "")
                  : setPhotoURL(user.photoURL)
              );
          }}
        >
          <Text style={styles.infoInputModalButton}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => {
              setIsInfoInputModalVisible(false);
              inputModalType === "name"
                ? db.collection("users").doc(user.uid).update({
                    name: userName,
                  })
                : inputModalType === "about"
                ? db.collection("users").doc(user.uid).update({
                    about: about,
                  })
                : setPhotoURL(
                    db.collection("users").doc(user.uid).update({
                      photoURL: photoURL,
                    })
                  );
              inputModalType === "name"
                ? dispatch(setName({ name: userName }))
                : dispatch(setReduxPhotoURL({ photoURL: photoURL }));
            }}
            style={styles.infoInputModalButton}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setInputModalInputType("photo");
          setIsInfoInputModalVisible(true);
        }}
      >
        <Image
          style={styles.avatar}
          source={{
            uri: route.params?.photoURL,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setInputModalInputType("name");
          setIsInfoInputModalVisible(true);
        }}
        style={styles.nameContainer}
      >
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
              <Text>{userName}</Text>
            </View>
            <MaterialCommunityIcons name="pencil" size={20} color="gray" />
          </View>
          <Text style={styles.nameDisclaimer}>
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setInputModalInputType("about");
          setIsInfoInputModalVisible(true);
        }}
        style={styles.aboutContainer}
      >
        <AntDesign
          style={styles.icon}
          name="infocirlceo"
          size={20}
          color="#128C7E"
        />
        <View style={styles.aboutRightItem}>
          <View>
            <Text style={styles.textItemTitle}>About</Text>
            <Text>{about}</Text>
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
      {isInfoInputModalVisible && <InfoInputModal />}
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
  infoInputModal: {
    position: "absolute",
    bottom: 0,
    height: 150,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  infoInputModalButtonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  infoInputModalText: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  infoInputModalButton: {
    padding: 10,
    color: "#128C7E",
  },
  infoInputModalInput: {
    padding: 10,
    borderRadius: 10,
    borderBottomColor: "#128C7E",
    borderBottomWidth: 1,
    margin: 5,
    alignSelf: "stretch",
    color: "black",
    fontSize: 17,
  },
});

export default Profile;
