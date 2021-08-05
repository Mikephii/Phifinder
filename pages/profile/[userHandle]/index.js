import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";

//Components
import Post from "../../../components/post/Post";
import Profile from "../../../components/profile/Profile";
import StaticProfile from "../../../components/profile/StaticProfile";
import PostSkeleton from "../../../utility/PostSkeleton";
import ProfileSkeleton from "../../../utility/ProfileSkeleton";
import Comments from "../../../components/post/Comments";
//MUIstuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//redux stuff
import { connect } from "react-redux";
import { getUserPosts } from "../../../redux/actions/dataActions";
import PostPreviewCard from "../../../components/post/PostPreviewCard";

//------------------------------COMPONENT
const ProfilePage = (props) => {
  //local state for profile data
  const [profile, setProfile] = useState({});

  //onLoad axios get the profile data using the url userHandle and set it to local state
  const userHandle = props.userHandle;
  const getUserPosts = props.getUserPosts;

  useEffect(() => {
    //this one is the dataaction that gets the posts from the userHandle an sets to redux state array for posts

    getUserPosts(userHandle);
    //gets the user data
    axios
      .get(`/user/${userHandle}`)
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((err) => console.log(err));
  }, [userHandle, getUserPosts, props.user.handle]);

  //destructure from data state pasted as prop
  const { posts, loading } = props.data;

  const postsMarkup = !loading ? (
    posts !== null ? (
      posts.map((post) => {
        return <PostPreviewCard key={post.postId} post={post} />;
      })
    ) : (
      <p>No posts yet...</p>
    )
  ) : (
    <PostSkeleton />
  );

  return (
    <Fragment>
      {profile ? (
        props.user.handle === userHandle ? (
          <Profile profile={profile} />
        ) : (
          <StaticProfile profile={profile} />
        )
      ) : (
        <ProfileSkeleton />
      )}

      <Grid style={{ marginTop: 20 }} container spacing={0}>
        <Grid item sm={12}>
          {postsMarkup}
        </Grid>
      </Grid>
    </Fragment>
  );
};
//------------------------------------------------------

ProfilePage.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    user: state.user.credentials,
  };
};

const mapActionsToProps = {
  getUserPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);

//get serverside props from next
export async function getServerSideProps(context) {
  const userHandle = context.params.userHandle;

  return {
    props: { userHandle }, // will be passed to the page component as props
  };
}
