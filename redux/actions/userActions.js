import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_AS_READ,
} from "../types";
import axios from "axios";
import Router from "next/router";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then((response) => {
      setAuthorizationHeader(response.data.idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      Router.push("/");
      //history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", newUserData)
    .then((response) => {
      setAuthorizationHeader(response.data.idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      //history.push("/");
      Router.push("/subscribe");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((response) => {
      dispatch({ type: SET_USER, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editProfileDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markNotificationsAsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((response) => {
      dispatch({ type: MARK_NOTIFICATIONS_AS_READ });
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAuthorizationHeader = (idToken) => {
  const FBIdToken = `Bearer ${idToken}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
