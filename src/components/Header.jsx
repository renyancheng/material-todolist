import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
