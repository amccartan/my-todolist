"use client";

import { ToDoListItem } from './ToDoListItem';
import {type ToDoItem} from './useToDoList';
import { ToDoContext } from './ToDoListContext';
import { useState , useContext} from 'react';
import { api } from '~/trpc/react';


type ToDoItemCheckBox = {
  checked: boolean;
  onChange: () => void;
};

const CheckBox = ({ checked, onChange }: ToDoItemCheckBox) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      done?
    </label>
  );
};

type ToDoListProps = {
  list: ToDoItem[];
};

export default function ToDoList({ list }: ToDoListProps) {
  
  const [newToDoItem, setNewToDoItem] = useState(""); //local state for new todo input
  const listControl = useContext(ToDoContext); //access global todo list controls from context


  //trpc mutation for creating a new todo in the database
  const createToDoItemMutation = api.createToDoItem.createToDoItem.useMutation();


  const handleCreateToDoItem = () => {
    if (!newToDoItem.trim()) return; //preventing whitespace/empty inputs
    //.trim() removes all whitespace
    //! checks whether the trimmed name is empty

    createToDoItemMutation.mutate(
      { text : newToDoItem }, //variable expected by backend
      {
        onSuccess: (data) => {
          //database then responds with {toDoItem} 
          // (this is because createToDoItem in toDoItem.ts returns a toDoItem...
          // ... this '{ toDoItem: { id, text, done } }' is then used below to update local state/context)
          listControl.addItem(data.toDoItem); //update local state/context
          setNewToDoItem(""); // clear input after success
        },
      } 
    );
  }

  return(
    <div>
        <input
              type="text"
              placeholder="Enter new task here..."
              value={newToDoItem}
              onChange={(e) => setNewToDoItem(e.target.value)}
            />
            <button onClick={handleCreateToDoItem}>
              Create task!
            </button>

            
      <ol>
        {list.map((item, index) => (
          <div key={item.id}>
            <CheckBox checked={item.done} onChange={() => listControl.toggleItem(index)} />
            <ToDoListItem item={item} />
            <button onClick={() => listControl.removeItem(index)}>Remove</button>
          </div>
        ))}
      </ol>
    </div>
  );
}