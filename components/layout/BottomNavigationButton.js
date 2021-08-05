import React from "react";

import Link from "next/link";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const BottomNavigationButton = (props) => {
  const { icon, href, label } = props;

  return (
    <Link href={href} passHref>
      <Button color="primary">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {icon}
          <Typography style={{ fontSize: 10 }}>{label}</Typography>
        </div>
      </Button>
    </Link>
  );
};

export default BottomNavigationButton;
