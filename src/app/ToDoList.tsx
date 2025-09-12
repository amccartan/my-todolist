"use client";
import * as React from 'react';
import { ToDoListItem } from './ToDoListItem';
import {type ToDoItem} from './useToDoList';
import { ToDoContext } from './ToDoListContext';


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
  const [newToDoItem, setNewToDoItem] = React.useState('');
  const listControl = React.useContext(ToDoContext);

    // FOR ADDING NEW LIST ITEM
  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setNewToDoItem(event.target.value);
  }

  return(
    <div>
      <input
        type="text"
        value={newToDoItem}
        onChange={handleChange}
        placeholder="Type new task here..."
      />
      <button type="button" onClick={() => {
        listControl.addItem(newToDoItem);
        setNewToDoItem("");
      }}>
        Add New Task!
      </button>

      <ol>
        {list.map((item, index) => (
          <div key={index}>
            <CheckBox checked={item.done} onChange={() => listControl.toggleItem(index)} />
            <ToDoListItem item={item} />
          </div>
        ))}
      </ol>
    </div>
  );
}