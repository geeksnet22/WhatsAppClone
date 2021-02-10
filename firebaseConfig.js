import firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyBcVJ_dTUswNenZc5e3_fbnfZFBSzekje8",
//     authDomain: "whatsapp-clone-73d37.firebaseapp.com",
//     projectId: "whatsapp-clone-73d37",
//     storageBucket: "whatsapp-clone-73d37.appspot.com",
//     messagingSenderId: "1072812563772",
//     appId: "1:1072812563772:web:5c51d6293c5fe175ca1239",
//     measurementId: "G-21MHCD9MFG"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBOHrqFl9Yo1a4zkOiTzPbcm7V7zaLMYZI",
  authDomain: "twitter-clone-e391d.firebaseapp.com",
  projectId: "twitter-clone-e391d",
  storageBucket: "twitter-clone-e391d.appspot.com",
  messagingSenderId: "158888629458",
  appId: "1:158888629458:web:9d9a4f8cd1933e0db2890b",
  measurementId: "G-Z5NBLM72RD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
