export const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <li class="flex items-center">
      <input
        id={"Todo_" + todo.id}
        type="checkbox"
        checked={todo.completed}
        readOnly
        onChange={handleTodoClick}
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for={"Todo_" + todo.id}
        class="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
      >
        {todo.name}
      </label>
    </li>
  );
};
