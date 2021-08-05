import React, { Fragment } from "react";
import NoImg from "../public/images/no-img.png";
import PropTypes from "prop-types";
import Image from "next/image";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

//icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const ProfileSkeleton = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div
          className="image-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="profile-image">
            <Image
              src={NoImg}
              alt="profile"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle}></div>
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  ...theme.spreadMe,
  icon: {
    color: "primary",
    opacity: 0.5,
  },
  handle: {
    borderRadius: 5,
    margin: "auto",
    width: "30%",
    height: 20,
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5,
    marginBottom: 7,
  },
  fullLine: {
    margin: "auto",
    borderRadius: 5,
    width: "80%",
    height: 15,
    backgroundColor: "rgba(0,0,0,0.15)",
    marginBottom: 10,
  },
});

export default withStyles(styles, { withTheme: true })(ProfileSkeleton);
