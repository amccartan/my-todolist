"use client";

import { ToDoListItem } from './ToDoListItem';
import {useToDoList, type ToDoItem} from './useToDoList';
import { ToDoContext } from './ToDoListContext';
import { useState , useContext} from 'react';


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
  
  const listControl = useContext(ToDoContext);

  return(

    <div>
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