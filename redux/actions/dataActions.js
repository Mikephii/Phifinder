import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DISLIKE_POST,
  UNDISLIKE_POST,
  DELETE_POST,
  LOADING_UI,
  NEW_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  NEW_COMMENT,
  SET_ROOTCOMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  DISLIKE_COMMENT,
  UNDISLIKE_COMMENT,
  COIN_POST,
  UNCOIN_POST,
  SET_COINS,
  COIN_COMMENT,
  UNCOIN_COMMENT,
  CLEAR_RECENTLY_AUTHORED,
} from "../types";
import axios from "axios";

//get all posts
export const getPosts = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/posts/as/${userHandle}`)
    .then((response) => {
      dispatch({ type: SET_POSTS, payload: response.data.posts });
      console.log(userHandle);
      console.log(response.data.coins);
      dispatch({ type: SET_COINS, payload: response.data.coins });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });

      console.log(err);
    });
};

export const getPostsFromGroup = (group, userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/p/${group}/posts/as/${userHandle}`)
    .then((response) => {
      dispatch({ type: SET_POSTS, payload: response.data.posts });
      console.log(userHandle);
      console.log(response.data.coins);
      dispatch({ type: SET_COINS, payload: response.data.coins });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });

      console.log(err);
    });
};

//like a post

export const likePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/undislike`)
    .then((response) => {
      dispatch({ type: UNDISLIKE_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      axios
        .post(`/post/${postId}/like`)
        .then((response) => {
          dispatch({ type: LIKE_POST, payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

//unlike post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/unlike`)
    .then((response) => {
      dispatch({ type: UNLIKE_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//dislike or downvote post
export const dislikePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/unlike`)
    .then((response) => {
      dispatch({ type: UNLIKE_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      axios
        .post(`/post/${postId}/dislike`)
        .then((response) => {
          dispatch({ type: DISLIKE_POST, payload: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

//undislike post
export const undislikePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/undislike`)
    .then((response) => {
      dispatch({ type: UNDISLIKE_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const newPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/post", newPost)
    .then((response) => {
      dispatch({ type: NEW_POST, payload: response.data });
      dispatch(clearErrors());
    })
    .then(() => {
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

//pass userhandle so when getting post can also get comment likes dislikes
export const getPost = (postId, userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/post/${postId}/as/${userHandle}`)
    .then((response) => {
      dispatch({ type: SET_POST, payload: response.data });
      console.log(response);
      dispatch({ type: SET_COINS, payload: response.data.coins });
      dispatch({
        type: SET_ROOTCOMMENTS,
        payload: response.data.rootCommentIDs,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, comment)
    .then((response) => {
      dispatch({ type: NEW_COMMENT, payload: response.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      if (err.response) {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      } else {
        console.log(err);
      }
    });
};

//not to be confised with get user data from userActions
export const getUserPosts = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/user/${userHandle}`)
    .then((response) => {
      dispatch({ type: SET_POSTS, payload: response.data.posts });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: null });
    });
};

///COMMENTS

export const likeComment = (comment, userHandle) => (dispatch) => {
  const { commentID, postId, ancestors } = comment;
  axios
    .post(`/comment/${postId}/${commentID}/undislike`, ancestors)
    .then((response) => {
      let payload = {
        comment: response.data,
        userHandle: userHandle,
      };

      dispatch({ type: UNDISLIKE_COMMENT, payload: payload });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      axios
        .post(`/comment/${postId}/${commentID}/like`, ancestors)
        .then((response) => {
          console.log(response.data);
          let payload = {
            comment: response.data,
            userHandle: userHandle,
          };
          dispatch({ type: LIKE_COMMENT, payload: payload });
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

export const dislikeComment = (comment, userHandle) => (dispatch) => {
  const { commentID, postId, ancestors } = comment;
  axios
    .post(`/comment/${postId}/${commentID}/unlike`, ancestors)
    .then((response) => {
      let payload = {
        comment: response.data,
        userHandle: userHandle,
      };

      dispatch({ type: UNLIKE_COMMENT, payload: payload });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      axios
        .post(`/comment/${postId}/${commentID}/dislike`, ancestors)
        .then((response) => {
          console.log(response.data);
          let payload = {
            comment: response.data,
            userHandle: userHandle,
          };
          dispatch({ type: DISLIKE_COMMENT, payload: payload });
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

//unlike comment
export const unlikeComment = (comment, userHandle) => (dispatch) => {
  const { commentID, postId, ancestors } = comment;
  axios
    .post(`/comment/${postId}/${commentID}/unlike`, ancestors)
    .then((response) => {
      let payload = {
        comment: response.data,
        userHandle: userHandle,
      };
      console.log("dispatch unlike comment");
      dispatch({ type: UNLIKE_COMMENT, payload: payload });
    })
    .catch((err) => {
      console.log(err);
    });
};

//undislike comment
export const undislikeComment = (comment, userHandle) => (dispatch) => {
  const { commentID, postId, ancestors } = comment;
  axios
    .post(`/comment/${postId}/${commentID}/undislike`, ancestors)
    .then((response) => {
      let payload = {
        comment: response.data,
        userHandle: userHandle,
      };

      dispatch({ type: UNDISLIKE_COMMENT, payload: payload });
    })
    .catch((err) => {
      console.log(err);
    });
};

//--------------------------COINS------------------------------//

export const coinPost = (postId, recipient) => (dispatch) => {
  axios
    .post(`/post/${postId}/${recipient}/coin`)
    .then((response) => {
      dispatch({ type: COIN_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uncoinPost = (postId, recipient) => (dispatch) => {
  axios
    .post(`/post/${postId}/${recipient}/uncoin`)
    .then((response) => {
      dispatch({ type: UNCOIN_POST, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const coinComment =
  (commentID, postId, recipient, donor) => (dispatch) => {
    axios
      .post(`/post/${postId}/${commentID}/${recipient}/coinComment`)
      .then((response) => {
        let payload = {
          comment: response.data,
          donor: donor,
          recipient: recipient,
        };

        dispatch({ type: COIN_COMMENT, payload: payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const uncoinComment =
  (commentID, postId, recipient, donor) => (dispatch) => {
    axios
      .post(`/post/${postId}/${commentID}/${recipient}/uncoinComment`)
      .then((response) => {
        let payload = {
          comment: response.data,
          donor: donor,
          recipient: recipient,
        };

        dispatch({ type: UNCOIN_COMMENT, payload: payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };

//i made this data aciton to fix a bug on the author page when trying to route
//the user to their post URL after posting.
export const clearRecentlyAuthored = () => (dispatch) => {
  dispatch({ type: CLEAR_RECENTLY_AUTHORED });
};
