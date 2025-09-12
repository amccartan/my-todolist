"use client";

import {api} from '../trpc/react';
import ToDoList from './ToDoList';
import { ToDoContext } from './ToDoListContext';
import { useToDoList } from './useToDoList';


export default function MyToDoApp() {

  const data = api.helloWorld.helloWorld.useQuery();

  const listControl = useToDoList();

  return (
    <div>
    <h2>trpc client-rendered content: {data.data?.message}</h2>
    <ToDoContext.Provider value={listControl}>
      <div>
        <h1>Amy's To-Do List!</h1>
        <p>Counting total taks from a parent node: {listControl.list.length}</p>
        <ToDoList list={listControl.list} />
      </div>
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
