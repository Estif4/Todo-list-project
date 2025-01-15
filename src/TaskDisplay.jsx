 import React from 'react'
 import Edit from './assets/Edit.png';
import trash from './assets/trash.png';
 export default function DisplayTask({tasks,taskDone,taskEditing,taskDeleting}){
  return( <>
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
            </>) }