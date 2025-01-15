import React from "react";

export default function TaskSearch({ Tasksearchvalue, setTasksearch, setTasks, Tasksearch }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setTasksearch(value);
    if (value === "") {
      try {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error loading tasks from local storage:", error);
        setTasks([]);
      }
    }
  };

  return (
    <div className="flex flex-col md:absolute md:right-0">
      <label htmlFor="task" className="mb-1 text-sm font-sm text-gray-300">
        Input task name:
      </label>
      <input
        type="text"
        id="task"
        value={Tasksearchvalue}
        onChange={handleInputChange}
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={Tasksearch}
        className="mt-1 px-2 py-1 bg-indigo-900 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}