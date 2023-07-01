import { Todo } from "./Todo";

export const TodoList = ({ todos, toggleTodo }) => {
  return (
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
};
