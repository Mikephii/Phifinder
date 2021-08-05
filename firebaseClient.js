const firebase = require("firebase");

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDNN-IUsEzt-GNcNt_hJqDQ6Qxc61dS8Ec",
  authDomain: "socialape-67dbc.firebaseapp.com",
  projectId: "socialape-67dbc",
  storageBucket: "socialape-67dbc.appspot.com",
  messagingSenderId: "916151690295",
  appId: "1:916151690295:web:8bcb986016ed078e78cbb2",
  measurementId: "G-VSPHTDPWMS",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
