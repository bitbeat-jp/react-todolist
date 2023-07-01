import { useState, useRef } from "react";
import "./styles.css";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="App" class="m-8">
      <div class="mb-2">
        <div class="relative w-full">
          <input
            type="text"
            ref={todoNameRef}
            placeholder="タスク名"
            class="block w-full p-2.5 bg-gray-50 text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={handleAddTodo}
            class="absolute top-px right-px p-2.5 text-white bg-blue-700 font-medium text-sm rounded-r-lg sm:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            タスクを追加
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <div class="inline-flex items-center justify-center p-2.5 font-medium text-sm text-center text-blue-700 bg-white border-2 border-blue-700 dark:text-blue-600 dark:bg-black dark:border-blue-600">
          残りのタスク
          <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {todos.filter((todo) => !todo.completed).length}
          </span>
        </div>
        <button
          onClick={handleClear}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          完了したタスクの削除
        </button>
      </div>
      <div class="p-2.5 border border-blue-700" hidden={todos.length === 0}>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};
