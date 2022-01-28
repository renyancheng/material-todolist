import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList(props) {
  const { todos } = props;

  return (
    <>
      <List>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    defaultChecked={todo.done}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={todo.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
