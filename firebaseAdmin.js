import { database } from "firebase-admin";

const admin = require("firebase-admin");

const serviceAccount = require("./secrets.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://socialape-67dbc.firebaseio.com",
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => console.error(err));
};
