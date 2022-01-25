import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {},
  palette: {
    mode: "dark",
  },
  breakpoints: {},
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
