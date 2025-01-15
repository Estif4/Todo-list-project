import React from "react";
import { useRef } from "react";

export default function Editinput({editValue,setEditValue,submitEdit,editInputRef,editIndex }){
return(
  <>
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
            </>)}