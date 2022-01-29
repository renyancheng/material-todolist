import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { withSnackbar, useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function Footer(props) {
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

  const handleClose = () => {
    setDialog(false);
  };

  const onSubmit = ({ newTodo }) => {
    props.addTodo(newTodo);
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
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <StyledFab color="secondary" onClick={handleAddTodo}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={dialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>新建一个Todo</DialogTitle>
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
                required: "todo是必须的",
                minLength: {
                  value: 2,
                  message: "字段todo至少为2个字符",
                },
                maxLength: {
                  value: 10,
                  message: "字段todo不能超过10个字符",
                },
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">确定</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default withSnackbar(Footer);
