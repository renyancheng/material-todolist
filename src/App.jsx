import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { nanoid } from "nanoid";
import { set as setLocal, get as getLocal } from "lockr";
import { compareArray } from "./utils";
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

  useEffect(() => {
    setLocal("todos", todos);
  }, [todos]);

  const addTodo = (name) => {
    const newTodo = {
      id: nanoid(),
      name,
      done: false,
    };
    setTodos((todos) => {
      return [...todos, newTodo];
    });
  };

  const updateTodo = (id, done) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, done };
      else return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const deleteAllDoneTodos = () => {
    const newTodos = todos.filter((todo) => {
      return todo.done === false;
    });
    if (compareArray(todos, newTodos)) return false;
    setTodos(newTodos);
    return true;
  };

  const doneAllTodos = (done) => {
    const newTodos = todos.map((todo) => {
      todo.done = done;
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <Header></Header>
      <Container maxWidth="lg" sx={{ py: "70px" }}>
        <Card>
          <TodoList
            todos={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          ></TodoList>
        </Card>
      </Container>
      <Footer
        todos={todos}
        addTodo={addTodo}
        doneAllTodos={doneAllTodos}
        deleteAllDoneTodos={deleteAllDoneTodos}
      ></Footer>
    </>
  );
}
