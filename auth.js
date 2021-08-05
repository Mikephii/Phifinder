import React, { useState, useEffect, useContext, createContext } from "react";

import nookies from "nookies";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseClient from "./firebaseClient";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, []);

  return <AuthContext.provider value={user}> {children} </AuthContext.provider>;
};

export { AuthProvider, useAuth };
