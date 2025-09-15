"use client";

import ToDoList from './ToDoList';
import { ToDoContext } from './ToDoListContext';
import { useToDoList } from './useToDoList';
import {api} from '../trpc/react';


export default function MyToDoApp() {

  const listControl = useToDoList();

  const data = api.helloWorld.helloWorld.useQuery();
  
  return (
    <div>
    <h2>trpc client-rendered content: {data.data?.message}</h2> {/*the first 'data' is the result of useQuery, and it contains the property 'data'*/}

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
