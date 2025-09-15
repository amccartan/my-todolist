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
  
  const [newToDoItem, setNewToDoItem] = useState("");
  const listControl = useContext(ToDoContext);

  const createToDoItemMutation = api.createToDoItem.createToDoItem.useMutation();


  const handleCreateToDoItem = () => {
    if (!newToDoItem.trim()) return; //preventing whitespace/empty inputs
    //.trim() removes all whitespace
    //! checks whether the trimmed name is empty

    createToDoItemMutation.mutate(
      { text : newToDoItem },
      {
        onSuccess: (data) => {
          listControl.addItem(data.toDoItem); //add to local UI
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