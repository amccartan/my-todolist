"use client";

import ToDoList from './ToDoList';
import { ToDoContext } from './ToDoListContext';
import { useToDoList } from './useToDoList';
import { useState } from 'react';
import {api} from '../trpc/react';


export default function MyToDoApp() {

  const listControl = useToDoList();

  const data = api.helloWorld.helloWorld.useQuery();

  //used for inserting a to do list item into db
  const createToDoItemMutation = api.createToDoItem.createToDoItem.useMutation();
  const [text, setText] = useState("");


  const handleCreateToDoItem = () => {
    if (!text.trim()) return; //preventing whitespace/empty inputs
    //.trim() removes all whitespace
    //! checks whether the trimmed name is empty

    createToDoItemMutation.mutate(
      { text },
      {
        onSuccess: (data) => {
          listControl.addItem(data.toDoItem.text); //add to local UI
          setText(""); // clear input after success
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  
  return (
    <div>
    <h2>trpc client-rendered content: {data.data?.message}</h2> {/*the first 'data' is the result of useQuery, and it contains the property 'data'*/}

    <ToDoContext.Provider value={listControl}>
      <div>
        <h1>Amy's To-Do List!</h1>
        <p>Counting total taks from a parent node: {listControl.list.length}</p>
        <ToDoList list={listControl.list} />
      </div>

       <input
              type="text"
              placeholder="Enter new task here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleCreateToDoItem}>
              Create task!
            </button>
    </ToDoContext.Provider>

    <div>
      {/* for localStorage testing purposes */}
      <button className="link" onClick={() => window.location.reload()}>
          Reload Window
        </button>
        <button
          className="link"
          onClick={() => {
            window.localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Local Storage
        </button>
    </div>
  </div>
  );
}
