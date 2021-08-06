import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFC107",
      light: "#FFA000",
    },
    type: "dark",
    secondary: {
      main: "#48BEFF",
    },
    body1: {
      color: "white",
    },
    body2: {
      color: "white",
    },
    background: {
      default: "#121212",
    },
  },
  spreadMe: {
    typography: {
      useNextVariants: true,
    },

    form: {
      textAlign: "center",
    },
    logo: {
      position: "relative",
      height: "30px",
      width: "30px",
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    button: {
      margin: "20px auto 20px auto",
      position: "relative",
    },
    inputMargin: { margin: "10px auto 10px auto" },
    textField: {
      margin: "10px auto 10px auto",
      borderRadius: 40,

      [`& fieldset`]: {
        borderRadius: 40,
        background: "#202124",
        zIndex: -1,
      },
    },

    customError: {
      color: "#f44336",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: { position: "absolute" },
    invisibleSeperator: {
      border: "none",
      margin: 4,
    },
    visibleSeperator: {
      width: "80%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginTop: "20px",
    },
    paper: {
      backgroundColor: "#1a1a1a",
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#FFC107",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },

  //this styles the RTE and typography
  overrides: {
    MuiTypography: {
      root: {
        wordBreak: "break-word",
      },
    },
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "100%",
        border: "1px rgba(255,255,255,0.25) solid",
        borderRadius: 5,
      },

      editor: {
        minHeight: 150,
        padding: 15,
        color: "255,255,255,0.2",
      },
      toolbar: {
        borderBottom: "1px rgba(255,255,255,0.25)solid",
      },
      placeHolder: {
        paddingLeft: 15,
        paddingTop: 15,
      },
    },
  },
});

export default theme;
