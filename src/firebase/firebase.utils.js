import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB4QOjJUm7y2XOC7Z_ZOJtMPVpRMOQTFro",
  authDomain: "crwn-db-d92d4.firebaseapp.com",
  databaseURL: "https://crwn-db-d92d4.firebaseio.com",
  projectId: "crwn-db-d92d4",
  storageBucket: "crwn-db-d92d4.appspot.com",
  messagingSenderId: "155229260553",
  appId: "1:155229260553:web:84bcbedcb800ec04f6e1d8",
  measurementId: "G-4C121TXDDL"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
