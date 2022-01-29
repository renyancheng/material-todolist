import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

export default function App() {
  let [todos, setTodos] = useState([
    { id: 1, name: "打游戏", done: true },
    { id: 2, name: "吃饭", done: false },
    { id: 3, name: "睡觉", done: false },
  ]);

  const addTodo = (name) => {
    console.log(name);
    setTodos((todos) => {
      return [
        {
          id: todos.length + 1,
          name,
          done: false,
        },
        ...todos,
      ];
    });
  };

  return (
    <>
      <ConfirmProvider>
        <SnackbarProvider maxSnack={3}>
          <Header></Header>
          <Container maxWidth="lg" sx={{ py: "70px" }}>
            <Card>
              <TodoList todos={todos}></TodoList>
            </Card>
          </Container>
          <Footer addTodo={addTodo}></Footer>
        </SnackbarProvider>
      </ConfirmProvider>
    </>
  );
}
