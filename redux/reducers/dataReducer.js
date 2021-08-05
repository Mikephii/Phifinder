import { CircularProgress } from "@material-ui/core";
import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DISLIKE_POST,
  UNDISLIKE_POST,
  DELETE_POST,
  NEW_POST,
  SET_POST,
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

const initialState = {
  posts: [],
  coins: [],
  post: {},
  recentlyAuthored: null,
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case SET_COINS:
      return {
        ...state,
        coins: action.payload,
      };

    case SET_POST:
      return { ...state, post: action.payload };

    case SET_ROOTCOMMENTS:
      return { ...state, rootCommentIDs: action.payload };

    //chained cases here just means in both cases do the same operation
    //this works because for both unlike and like we recieve the modified post data and simply replace it in state
    //this action type is also handled in userReducer to modify users likes array

    //like a comment
    case LIKE_COMMENT:
      //if its comment reply, find the comment in the replies array else find in the replies array

      let commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });
      state.post.commentReplies[commentIndex] = action.payload.comment;

      let newLike = {
        postId: action.payload.comment.postId,
        commentID: action.payload.comment.commentID,
        userHandle: action.payload.userHandle,
        createdAt: new Date().toISOString(),
      };

      console.log(state.post.userCommentLikes);
      state.post.userCommentLikes = [...state.post.userCommentLikes, newLike];
      console.log(state.post.userCommentLikes);

      return { ...state };

    case DISLIKE_COMMENT:
      //if its comment reply, find the comment in the replies array else find in the replies array

      commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });

      state.post.commentReplies[commentIndex] = action.payload.comment;

      newLike = {
        postId: action.payload.comment.postId,
        commentID: action.payload.comment.commentID,
        userHandle: action.payload.userHandle,
        createdAt: new Date().toISOString(),
      };

      state.post.userCommentDislikes = [
        ...state.post.userCommentDislikes,
        newLike,
      ];

      return { ...state };

    case UNLIKE_COMMENT:
      commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });
      state.post.commentReplies[commentIndex] = action.payload.comment;

      state.post.userCommentLikes = state.post.userCommentLikes.filter(
        (like) => {
          return like.commentID !== action.payload.comment.commentID;
        }
      );

      return { ...state };

    case UNDISLIKE_COMMENT:
      commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });
      state.post.commentReplies[commentIndex] = action.payload.comment;

      state.post.userCommentDislikes = state.post.userCommentDislikes.filter(
        (like) => {
          return like.commentID !== action.payload.comment.commentID;
        }
      );

      return { ...state };

    case DISLIKE_POST:
    case UNDISLIKE_POST:
    case LIKE_POST:
    case UNLIKE_POST:
      let likeIndex = state.posts.findIndex((post) => {
        return post.postId === action.payload.postId;
      });
      state.posts[likeIndex] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = { ...action.payload, comments: state.post.comments };
      }
      return {
        ...state,
      };

    case DELETE_POST:
      let deletePostIndex = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(deletePostIndex, 1);
      return {
        ...state,
      };

    case NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        recentlyAuthored: action.payload,
      };

    case NEW_COMMENT:
      //incrments data in single post item

      state.post.commentReplies = [
        ...state.post.commentReplies,
        action.payload,
      ];

      state.post.commentCount = state.post.commentCount + 1;

      //increments data in postsss array if on page where post is contained in posts array
      if (state.posts) {
        let commentPostIndex = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        );
        if (commentPostIndex > -1) {
          state.posts[commentPostIndex] = {
            ...state.posts[commentPostIndex],
            commentCount: state.posts[commentPostIndex].commentCount + 1,
          };
        }
      }

      return {
        ...state,
      };

    case COIN_POST:
      //update the post coin count in state
      let postIndex = state.posts.findIndex((post) => {
        return post.postId === action.payload.postId;
      });

      console.log(postIndex);
      let postData = state.posts[postIndex];
      postData.coinCount++;

      state.posts[postIndex] = postData;

      state.posts = [...state.posts];

      console.log(state.posts);

      // push new coin to coins

      state.coins = [action.payload, ...state.coins];

      return { ...state };

    case UNCOIN_POST:
      //update the post coin count in state
      postIndex = state.posts.findIndex((post) => {
        return post.postId === action.payload.postId;
      });

      console.log(postIndex);
      postData = state.posts[postIndex];
      postData.coinCount = postData.coinCount - 3;

      state.posts[postIndex] = postData;

      state.posts = [...state.posts];

      console.log(state.posts);

      // delete coins in coins

      state.coins = state.coins.filter((coin) => {
        return coin.postId !== action.payload.postId;
      });

      return { ...state };

    case COIN_COMMENT:
      commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });
      state.post.commentReplies[commentIndex] = action.payload.comment;

      let newCoin = {
        parentID: action.payload.comment.postId,
        commentID: action.payload.comment.commentID,
        donor: action.payload.donor,
        recipient: action.payload.recipient,
        createdAt: new Date().toISOString(),
      };

      state.post.commentCoins = [...state.post.commentCoins, newCoin];

      return { ...state };

    case UNCOIN_COMMENT:
      commentIndex = state.post.commentReplies.findIndex((comment) => {
        return comment.commentID === action.payload.comment.commentID;
      });
      state.post.commentReplies[commentIndex] = action.payload.comment;

      state.post.commentCoins = state.post.commentCoins.filter((coin) => {
        return coin.commentID !== action.payload.comment.commentID;
      });

      return { ...state };

    //this is to fix bug in author page routing to post url
    case CLEAR_RECENTLY_AUTHORED:
      return { ...state, recentlyAuthored: null };

    default:
      return state;
  }
}
