import { useState, useEffect, useRef } from 'react';
import './App.css';
import Edit from './assets/Edit.png';
import trash from './assets/trash.png';

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function Interface() {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const editInputRef = useRef(null); // Ref for the edit input field

  const taskAdding = () => {
    if (taskValue) {
      const currentDate = formatDate(new Date());
      const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      const newTasks = [{ text: taskValue, date: currentDate, color: getRandomColor(), completed: false }, ...tasks];
  
      // Update the state and local storage with the new tasks
      setTasks(newTasks);
      localStorageUpdate(newTasks);
  
      // Clear the input field
      setTaskValue('');
    }
  };
  

  function localStorageUpdate(localTask) {
    localStorage.setItem('tasks', JSON.stringify(localTask)); // Save updated tasks to local storage
  }

  function taskEditing(index) {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  }

  function submitEdit() {
    const newText = editValue;

    if (newText) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, text: newText } : task
      );
      setTasks(updatedTasks);
      localStorageUpdate(updatedTasks);
      setEditIndex(null); // Reset edit index after submitting
    }
  }

  function taskDeleting(indexOfDeleted) {
    const updatedTasks = tasks.filter((task, index) => index !== indexOfDeleted);
    setTasks(updatedTasks);
    localStorageUpdate(updatedTasks);
  }

  function taskDone(index) {
    const updatedTasks = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
    localStorageUpdate(updatedTasks);
  }

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    } catch (error) {
      console.error("Error loading tasks from local storage:", error);
      setTasks([]);
    }
  }, []);
  

  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus(); // Focus the input when editing mode is active
    }
  }, [editIndex]); // Run this effect when editIndex changes

  return (
    <div className="outer flex w-auto justify-center items-center min-h-screen">
      <div className="bg-[#180145] rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:p-8">
          <div className="flex">
            <div className="relative bg-[#D9D9D9] outline-8 outline-gray-300 p-4 w-10 h-8">
              <div className="absolute bg-[#D9D9D9] border-black border-b-4 border-r-4 p-4 bottom-1 left-0 w-6 h-6 border-solid"></div>
            </div>
            <div className="font-medium font-serif text-white text-3xl p-2">Todo</div>
          </div>
          <div className="flex flex-col p-4 md:mr-32">
            <div className="flex flex-row bg-black/50 border border-red-950 md:p-4">
              <div className="flex flex-col pb-6">
                <p className="text-white text-3xl text-center">
                  Task Done
                </p>
                <p className="text-white md:text-lg text-xs p-2 font-mono">
                  {tasks.filter(task => !task.completed).length === tasks.length
                    ? 'Try To do at least 1 🙏🙏🙏🙏'
                    : tasks.filter(task => task.completed).length === tasks.length
                    ? 'Nice Job for today 👏👏👏👏'
                    : 'Keep it Going 😜😜😜😜😜'}
                </p>
              </div>
              <div className="flex items-center justify-center bg-green-400 rounded-full w-10 h-10 p-8">
                <p className="text-center font-semibold text-2xl">
                  {tasks.filter(task => task.completed).length}/{tasks.length}
                </p>
              </div>  
            </div>
            <div className="flex flex-col gap-4">
              <div className='flex flex-row gap-2 pt-4'>
              <input
                type="text"
                placeholder="What is your Tasks for Today"
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    taskAdding();
                  }
                }}
                className="taskvalue border focus:outline-blue-400 border-gray-400 w-full pl-4 rounded-lg"
              />
              <button
                onClick={taskAdding}
                className="bg-green-500 active:bg-slate-400 flex justify-center items-center text-white text-4xl text-center pb-3 p-1 h-8 rounded-md"
              >
                +
              </button></div>
              {editIndex !== null ? (
                <div className="gap-6 flex">
                  <input
                    type="text"
                    className="bg-white rounded-md w-full focus:outline-blue-600"
                    value={editValue}
                    onChange={(el) => setEditValue(el.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        submitEdit();
                      }
                    }}
                    ref={editInputRef} // Attach the ref to the input
                  />
                  <p onClick={submitEdit} className="bg-blue-700 text-white p-1 rounded-md cursor-pointer">
                    Confirm 
                  </p>
                </div>
              ) : null}
            </div>
            {tasks.map((task, index) => (
              <div
                key={index}
                style={{ backgroundColor: task.color }}
                className="flex flex-row rounded-xl mt-4 gap-10 md:gap-44 shadow-md shadow-gray-500"
              >
                <div className="flex">
                  <div className="flex justify-center items-center group animate-pulse rounded-full h-6 w-6 mt-3 p-1 bg-white">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => taskDone(index)}
                      className="h-full w-full cursor-pointer group-hover:animate-none"
                    />
                  </div>    
                  <div className="flex flex-col">
                    <p
                      className={`text-white text-xl pl-4 pt-1 max-w-52 md:max-w-44 max-h-8 whitespace-nowrap overflow-hidden decoration-red-500 decoration-4 ${task.completed ? 'line-through' : ''}`}
                    >
                      {task.text}
                    </p>
                    <p className="text-gray font-serif font-bold text-xs px-8 pt-1 whitespace-wrap">
                      {task.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-4">
                  <img
                    className="cursor-pointer hover:bg-gray-300 size-7 md:size-8"
                    src={Edit}
                    alt="Edit"
                    onClick={() => taskEditing(index)}
                  />
                  <img
                    className="cursor-pointer hover:bg-gray-300 size-7 md:size-8"
                    src={trash}
                    alt="Trash"
                    onClick={() => taskDeleting(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Interface />
    </>
  );
}

export default App;
