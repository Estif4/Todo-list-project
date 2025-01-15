import React from 'react';

function TaskInput({ taskValue, setTaskValue, taskAdding }) {
  return (
    <div className='flex flex-row gap-2 pt-4'>
      <input
        type="text"
        placeholder="What is your Task for Today"
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
      </button>
    </div>
  );
}

export default TaskInput;