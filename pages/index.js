import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//Components
import Post from "../components/post/Post";
import PostPreviewCard from "../components/post/PostPreviewCard";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../utility/PostSkeleton";
import FeedController from "../components/layout/FeedController";
import ActionBar from "../components/layout/ActionBar";
//MUIstuff
import Grid from "@material-ui/core/Grid";

//redux stuff
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

const Home = (props) => {
  //not quite the same as compinent did mount. keep an eye out for flikering etc
  //

  const { getPosts } = props;

  const userHandle = props.userHandle ? props.userHandle : "guest";

  useEffect(() => {
    if (userHandle) {
      getPosts(userHandle);
    }
  }, [getPosts, userHandle]);

  //destructure posts array and loading boolean from props.data passed in from react-redux connect
  const { loading } = props.data;
  const { posts } = props;

  let recentPostsMarkup = !loading ? (
    posts.map((post) => {
      return (
        <PostPreviewCard
          key={post.postId}
          post={post}
          coinCount={post.coinCount}
        ></PostPreviewCard>
      );
    })
  ) : (
    <PostSkeleton />
  );

  return (
    <Fragment>
      <FeedController group={""} />
      <div style={{ height: 55 }} />
      <Grid
        style={{ border: "none" }}
        container
        spacing={0}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} style={{ marginTop: 30 }}>
          {recentPostsMarkup}
        </Grid>
      </Grid>
    </Fragment>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    userHandle: state.user.credentials.handle,
    posts: state.data.posts,
  };
};

const mapActionsToProps = { getPosts };

export default connect(mapStateToProps, mapActionsToProps)(Home);
