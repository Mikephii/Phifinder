import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  DISLIKE_POST,
  UNDISLIKE_POST,
  MARK_NOTIFICATIONS_AS_READ,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  dislikes: [],
  notifications: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };

    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case LOADING_USER:
      return { ...state, loading: true };

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };

    case DISLIKE_POST:
      return {
        ...state,
        dislikes: [
          ...state.dislikes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case UNDISLIKE_POST:
      return {
        ...state,
        dislikes: state.dislikes.filter(
          (dislike) => dislike.postId !== action.payload.postId
        ),
      };

    case MARK_NOTIFICATIONS_AS_READ:
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      return { ...state };

    default:
      return state;
  }
}
