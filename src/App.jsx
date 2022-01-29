import React, { useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import { nanoid } from "nanoid";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

export default function App() {
  let [todos, setTodos] = useState([
    { id: 1, name: "打游戏", done: true },
    { id: 2, name: "吃饭", done: false },
    { id: 3, name: "睡觉", done: false },
  ]);

  const addTodo = (name) => {
    // console.log(name);
    setTodos((todos) => {
      return [
        ...todos,
        {
          id: nanoid(),
          name,
          done: false,
        },
      ];
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}
