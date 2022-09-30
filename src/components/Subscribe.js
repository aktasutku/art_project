import React from "react";
import "./Subscribe.css";
import SubscribeImg from "../assets/Subscribe.png";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FB8712",
    },
    secondary: {
      main: "#FFF",
    },
  },
  typography: {
    fontFamily: ["DynaPuff"],
  },
});

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="subscribe__img">
        <img src={SubscribeImg} />
      </div>
      <form className="subscribe__comment">
        <p>Subscribe</p>
        <h3>
          Don't miss out on exclusive behind-the-scenes access, early demos,
          live streams and other benefits by subscribing to our newsletter.
        </h3>
        {/* <input type="email" placeholder="Email adress" /> */}
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="primary"
            sx={{
              maxWidth: 500,
              letterSpacing: 3,
              bgcolor: "#FFF",
            }}
          />
          <Button
            variant="contained"
            sx={{
              maxWidth: 500,
              color: "#FFF",
              letterSpacing: 3,
              "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
            }}
          >
            SUBMIT
          </Button>
        </ThemeProvider>

        {/* <button type="submit">SUBMIT</button> */}
      </form>
    </div>
  );
};

export default Subscribe;
