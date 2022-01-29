import React, { useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { nanoid } from "nanoid";
import { set as setLocal, get as getLocal } from "lockr";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

export default function App() {
  let [todos, setTodos] = useState(
    getLocal("todos") ?? [
      { id: 1, name: "打游戏", done: true },
      { id: 2, name: "吃饭", done: false },
      { id: 3, name: "睡觉", done: false },
    ]
  );

  const addTodo = (name) => {
    const newTodo = {
      id: nanoid(),
      name,
      done: false,
    };
    setTodos((todos) => {
      setLocal("todos", [...todos, newTodo]);
      return [...todos, newTodo];
    });
  };

  const updateTodo = (id, done) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, done };
      else return todo;
    });
    setTodos(newTodos);
    setLocal("todos", newTodos);
  };

  return (
    <>
      <Header></Header>
      <Container maxWidth="lg" sx={{ py: "70px" }}>
        <Card>
          <TodoList todos={todos} updateTodo={updateTodo}></TodoList>
        </Card>
      </Container>
      <Footer addTodo={addTodo}></Footer>
    </>
  );
}
