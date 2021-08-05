import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

//components
import MyButton from "../../utility/MyButton";

//MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import EditIcon from "@material-ui/icons/Edit";
//redux stuff
import { connect } from "react-redux";
import { editProfileDetails } from "../../redux/actions/userActions";

//---------COMPONENT---------
const EditProfile = (props) => {
  //destructure
  const { classes } = props;

  //localstate
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  //set localstate from redux store handlers
  useEffect(() => {
    if (props.credentials.bio) {
      setBio(props.credentials.bio);
    }
  }, [props.credentials.bio]);

  useEffect(() => {
    if (props.credentials.website) {
      setWebsite(props.credentials.website);
    }
  }, [props.credentials.website]);

  useEffect(() => {
    if (props.credentials.location) {
      setLocation(props.credentials.location);
    }
  }, [props.credentials.location]);

  //open close dialog handlers
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  //onChange handlers
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  //handle submission
  const handleSubmit = () => {
    const updatedUserDetails = {
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : "",
    };

    props.editProfileDetails(updatedUserDetails);
    handleDialogClose();
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Profile Details"
        tipPlacement="top"
        onClick={handleDialogOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your Profile Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.TextField}
              value={bio}
              onChange={handleBioChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="your personal website"
              className={classes.TextField}
              value={website}
              onChange={handleWebsiteChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your location"
              className={classes.TextField}
              value={location}
              onChange={handleLocationChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
//---------END COMPONENT---------
const styles = (theme) => ({
  ...theme.spreadMe,
  button: {
    float: "right",
  },
});

EditProfile.propTypes = {
  editProfileDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

let mapActionsToProps = {
  editProfileDetails,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(EditProfile));
