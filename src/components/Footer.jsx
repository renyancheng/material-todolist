import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { withSnackbar, useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { useConfirm } from "material-ui-confirm";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function Footer(props) {
  const { todos, addTodo, doneAllTodos, deleteAllDoneTodos } = props;

  const doneCount = todos.reduce((pre, todo) => {
    if (todo.done) return pre + 1;
    else return pre;
  }, 0);

  const total = todos.length;

  const confirm = useConfirm();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "actionMenu",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleAddTodo = () => {
    setDialog(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [dialog, setDialog] = useState(false);

  const onSubmit = ({ newTodo }) => {
    addTodo(newTodo);
    reset();
    enqueueSnackbar("添加成功", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      TransitionComponent: Slide,
    });
    setDialog(false);
  };

  const handleDeleteAllDoneTodos = () => {
    popupState.close();
    confirm({
      title: "您确认要删除已完成的待办吗？",
      description: "操作后无法撤销",
      confirmationText: "确定",
      cancellationText: "取消",
    })
      .then(() => {
        const res = deleteAllDoneTodos();
        if (res)
          enqueueSnackbar("已删除全部已完成待办", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            TransitionComponent: Slide,
          });
        else
          enqueueSnackbar("当前无已完成待办", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            TransitionComponent: Slide,
          });
      })
      .catch(() => {});
  };

  const handleDoneAllTodos = (done) => {
    popupState.close();
    doneAllTodos(done);
  };

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
            已完成({doneCount}) / 全部({total})
          </Typography>
          <StyledFab color="secondary" onClick={handleAddTodo}>
            <Icon>add</Icon>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" {...bindTrigger(popupState)}>
            <Icon>more_vert</Icon>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={()=>handleDoneAllTodos(true)}>
              <ListItemIcon>
                <Icon>playlist_add_check</Icon>
              </ListItemIcon>
              <ListItemText>完成全部待办</ListItemText>
            </MenuItem>
            <MenuItem onClick={()=>handleDoneAllTodos(false)}>
              <ListItemIcon>
                <Icon>playlist_remove</Icon>
              </ListItemIcon>
              <ListItemText>取消完成全部待办</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteAllDoneTodos}>
              <ListItemIcon>
                <Icon>delete_sweep</Icon>
              </ListItemIcon>
              <ListItemText>删除已完成待办</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>新建一个待办</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="请输入你要做的事"
              placeholder="例如：写代码"
              variant="standard"
              error={errors?.newTodo ? true : false}
              helperText={errors?.newTodo ? errors.newTodo.message : null}
              {...register("newTodo", {
                required: "待办是必须的",
                minLength: {
                  value: 2,
                  message: "待办至少为2个字符",
                },
                maxLength: {
                  value: 10,
                  message: "待办不能超过10个字符",
                },
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog(false)}>取消</Button>
            <Button type="submit">确定</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default withSnackbar(Footer);
