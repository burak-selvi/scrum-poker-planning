// import * as firebase from "firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4OPejaVcfceQOfFZklE6NAFk7MNs4afk",
  authDomain: "scrum-master-planning.firebaseapp.com",
  databaseURL: "https://scrum-master-planning.firebaseio.com",
  projectId: "scrum-master-planning",
  storageBucket: "scrum-master-planning.appspot.com",
  messagingSenderId: "202685577484",
  appId: "1:202685577484:web:9ac1c425e87be806f6f129"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };

