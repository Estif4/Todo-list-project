import { useState, useEffect, useRef } from 'react';
import './App.css';
import TaskInput from './TaskInput';
import Taskinfo from './Taskinfo';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';
import TaskSearch from './TaskSearch';
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
  const [Tasksearchvalue,setTasksearch]=useState('');
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
  function Tasksearch(){
const searchedValue=tasks.filter((task,index)=>task.text===Tasksearchvalue)
console.log(searchedValue);
searchedValue.length>0?setTasks(searchedValue):'';
  }

  function localStorageUpdate(localTask) {
    localStorage.setItem('tasks', JSON.stringify(localTask)); // Save updated tasks to local storage
  }

  function taskEditing(index) {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  }

  function submitEdit() {
    const newText = editValue;
  const localtask=JSON.parse(localStorage.getItem('tasks'));
      if (newText) {
      const updatedTasks = localtask.map((task, index) =>
        index === editIndex ? { ...task, text: newText } : task
      );
      setTasks(updatedTasks);
      localStorageUpdate(updatedTasks);
      // localStorageUpdate(updatedTasks);
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
      <div className="bg-[#180145] rounded-lg p-4 relative">
        <div className="flex flex-col md:flex-row md:p-8">
          <div className="flex">
            <div className="relative bg-[#D9D9D9] outline-8 outline-gray-300 p-4 w-10 h-8">
              <div className="absolute bg-[#D9D9D9] border-black border-b-4 border-r-4 p-4 bottom-1 left-0 w-6 h-6 border-solid"></div>
            </div>
            <div className="font-medium font-serif text-white text-3xl p-2">Todo</div>
          </div>
          <div className="flex flex-col p-4 md:mr-32">
            <div className="flex flex-row bg-black/50 border border-red-950 md:p-4">
                <Taskinfo tasks={tasks}/>
               
            </div>
            <div className="flex flex-col gap-4 " >
             <TaskInput taskValue={taskValue} setTaskValue={setTaskValue}  taskAdding={taskAdding} />
              <TaskEdit editValue={editValue} setEditValue={setEditValue} submitEdit={submitEdit} editIndex={editIndex} editInputRef={editInputRef} />
            </div>
           <TaskDisplay tasks={tasks} taskDone={taskDone} taskEditing={taskEditing} taskDeleting={taskDeleting}/>
          </div> <TaskSearch  Tasksearchvalue={Tasksearchvalue} setTasksearch={setTasksearch} Tasksearch={Tasksearch} setTasks={setTasks} />
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
