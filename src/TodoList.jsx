import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//in useState when we ever the func call the setNewTodo or setTodo then the whole component will be re-rendered AND note re-render only works within the function component,  hooks can only be used at the top level of functional component

export default function TodoList() {
  let [newTodo, setNewTodo] = useState(""); //input event target - input box typed
  let [todos, setTodos] = useState([
    { task: "sampletask", id: uuidv4(), isDone: false },
  ]); //adding list

  let updateTodoVal = (event) => {
    setNewTodo(event.target.value);
  };

  let addNewTodo = () => {
    setTodos((prevTods) => {
      return [...prevTods, { task: newTodo, id: uuidv4(), isDone: false }];
    }); // newTodo refer to event target value
    setNewTodo(""); //inpute clear
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    //filters only which do not matches
  };

  let markAsDoneAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <h1> React - Todo List</h1>
      <input
        type="text"
        placeholder="add the task"
        value={newTodo}
        onChange={updateTodoVal}
      />
      <br /> <br />
      <button onClick={addNewTodo}>Add</button>
      <br />
      <br />
      <hr />
      <ul>
        {todos.map((todo) => (
          //each li has key
          <li key={todo.id}>
            <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>
              {todo.task}
            </span>{" "}
            &nbsp; &nbsp;
            <button onClick={() => deleteTodo(todo.id)}>Delete</button> &nbsp;
            <button onClick={() => markAsDone(todo.id)}>MarkAsDone</button>
          </li>
        ))}
      </ul>
      <button onClick={markAsDoneAll}>MarkAsDone All</button>
    </div>
  );
}
