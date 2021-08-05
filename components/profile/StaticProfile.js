import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
//import { Link } from "react-router-dom";
import Link from "next/link";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";

//compoinent
import ProfileSkeleton from "../../utility/ProfileSkeleton";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

//icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return imageUrl ? (
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
          <span>{dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  ) : (
    <ProfileSkeleton />
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  ...theme.spreadMe,
});

export default withStyles(styles, { withTheme: true })(StaticProfile);
