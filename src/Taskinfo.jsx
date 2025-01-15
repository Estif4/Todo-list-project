import React from "react"
export default function Taskinfo({tasks}){
  return(<>
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
</div></>)}