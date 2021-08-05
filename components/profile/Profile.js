import React, { Fragment } from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

//coimponents
import ProfileSkeleton from "../../utility/ProfileSkeleton";

//icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import MyButton from "../../utility/MyButton";

//---------------COMPONENT-----------------------
const Profile = (props) => {
  //destructure hell
  const {
    classes,
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated,
    },
  } = props;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <div className="profile-image">
              <Image
                src={imageUrl}
                alt="profile"
                layout="fill"
                objectFit="cover"
                unoptimized={false}
              />
            </div>
            <input
              hidden="hidden"
              type="file"
              id="imageInput"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit Profile Picture"
              tipPlacement="top"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="secondary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <Link href={`/users/${handle}`} passHref>
              <MuiLink color="primary" variant="h5">
                {handle}
              </MuiLink>
            </Link>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            <EditProfile />
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          Login or Signup!
        </Typography>
        <div className={classes.buttons}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" color="secondary">
              Signup
            </Button>
          </Link>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
};
//---------------END COMPONENT-----------------------

const styles = (theme) => ({
  ...theme.spreadMe,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

//need to pass withTheme in options to give styles callback access to theme

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(Profile));
