import React, { Fragment, useState } from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//components
import MyButton from "../../utility/MyButton";

//MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

//icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const NavMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications } = props;

  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
    console.log(event.target);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {};

  const logout = () => {
    props.logoutUser();
  };

  return (
    <Fragment>
      <Tooltip title="Menu">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          <MenuRoundedIcon style={{ color: "#6a6a6a" }} />
        </IconButton>
      </Tooltip>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={anchorEl ? true : false}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        <MenuItem onClick={logout}>
          <Typography color="default" variant="body1">
            Logout
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Typography
            color="secondary"
            variant="body1"
            style={{ fontWeight: 900 }}
          >
            Get the app!
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

NavMenu.propTypes = {
  markNotificationsAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.user.notifications,
  };
};

export default connect(mapStateToProps, { logoutUser })(NavMenu);
