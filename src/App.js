import { useState, useRef, useEffect } from "react";
import "./styles.css";
import "react-notifications/lib/notifications.css";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datetime-picker";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export const App = () => {
  const [todos, setTodos] = useState([]);

  const [todoAlarmDateTime, setTodoAlarmDateTime] = useState();

  const todoNameRef = useRef();

  const handlePickDateTime = (datetime) => {
    // 通知日時を登録する
    setTodoAlarmDateTime(datetime);
  };

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          name: name,
          completed: false,
          alarmDateTime: todoAlarmDateTime
        }
      ];
    });
    todoNameRef.current.value = null;
    setTodoAlarmDateTime(null);
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

  const formatDatetime = (datetime, withSecond) => {
    if (datetime === undefined) {
      return "";
    }
    return (
      datetime.getFullYear() +
      "/" +
      (datetime.getMonth() + 1) +
      "/" +
      datetime.getDate() +
      " " +
      datetime.getHours() +
      ":" +
      datetime.getMinutes() +
      (withSecond ? ":" + datetime.getSeconds() : "")
    );
  };

  useEffect(() => {
    setInterval(() => {
      todos
        .filter(
          (todo) =>
            formatDatetime(todo.alarmDateTime, true) ===
            formatDatetime(new Date(), true)
        )
        .forEach((todo) =>
          NotificationManager.warning(
            todo.name + "の時間です。",
            "TODOアラーム",
            10000
          )
        );
    }, 1000);
  });

  return (
    <div className="App m-8">
      <div className="mb-4">
        <div className="relative w-full">
          <div className="flex flex-col">
            <div className="mb-2 grid grid-cols-4 items-center">
              <label htmlFor="TodoName" className="flex-auto">
                タスク名
              </label>
              <input
                type="text"
                id="TodoName"
                ref={todoNameRef}
                className="col-span-3 block w-full p-2.5 bg-gray-50 text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-2 grid grid-cols-4 item-center">
              <label htmlFor="TodoDateTime" className="flex-auto">
                通知日時
              </label>
              <DatePicker
                id="TodoDateTime"
                formatDay={(locale, date) => date.getDate()}
                defaultView="month"
                value={todoAlarmDateTime}
                onChange={handlePickDateTime}
                className="col-span-3 block w-full bg-gray-50 text-sm text-gray-900 focus-ring-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddTodo}
              className="p-2.5 text-white bg-blue-700 font-medium text-sm rounded-lg sm:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              タスクを追加
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="inline-flex items-center justify-center p-2.5 font-medium text-sm text-center text-blue-700 bg-white border-2 border-blue-700 dark:text-blue-600 dark:bg-black dark:border-blue-600">
          残りのタスク
          <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {todos.filter((todo) => !todo.completed).length}
          </span>
        </div>
        <button
          onClick={handleClear}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          完了したタスクの削除
        </button>
      </div>
      <div className="p-2.5 border border-blue-700" hidden={todos.length === 0}>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>

      <NotificationContainer />
    </div>
  );
};
