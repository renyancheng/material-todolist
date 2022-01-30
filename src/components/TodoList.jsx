import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Icon from "@mui/material/Icon";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useConfirm } from "material-ui-confirm";

export default function TodoList(props) {
  const { todos, updateTodo, deleteTodo } = props;

  const confirm = useConfirm();

  const handleCheck = (id) => {
    return ({ target: { checked } }) => {
      updateTodo(id, checked);
    };
  };

  const handleDeleteTodo = (id) => {
    confirm({
      title: "您确认要删除此待办吗？",
      description: "操作后无法撤销",
      confirmationText: "确定",
      cancellationText: "取消",
    })
      .then(() => {
        deleteTodo(id);
      })
      .catch(() => {});
  };

  return (
    <>
      {todos?.length === 0 ? (
        <>
          <Alert severity="info">当前没有任何待办</Alert>
        </>
      ) : (
        <List>
          {todos?.map((todo) => {
            return (
              <ListItem key={todo.id} disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      onChange={handleCheck(todo.id)}
                      checked={todo.done}
                      disableRipple
                    />
                  </ListItemIcon>
                  {todo.done ? (
                    <del>
                      <ListItemText primary={todo.name} />
                    </del>
                  ) : (
                    <ListItemText primary={todo.name} />
                  )}
                  <ListItemSecondaryAction
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <IconButton edge="end">
                      <Icon>delete</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
