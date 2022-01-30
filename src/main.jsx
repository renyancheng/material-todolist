import React from "react";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import theme from "./theme";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
