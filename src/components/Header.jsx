import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Header() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          <IconButton
            color="inherit"
            component="a"
            href="https://github.com/mufeng233/material-todolist"
            target="_blank"
          >
            <GitHubIcon></GitHubIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
