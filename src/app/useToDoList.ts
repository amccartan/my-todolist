import { useState } from "react";
import { getLocalStorageItem, replaceLocalStorageItem } from "./Storage";

export type ToDoItem = {
  text:string;
  done:boolean;
}

/**
 * Handles state management for the todo list
 */
export const useToDoList = () => {

      //checking if data (List with capital L) exists in localStorage
      const [list, setList] = useState<ToDoItem[]>(getLocalStorageItem("List") ?? []); //if 'List' is undefined, use an empty array
      //this statement basically means, 'use this if it exists (List), and if not use this other thing (that appears after the ??)'

      return {
        list,
        addItem: (itemText: string) => {
            const newList = [...list, {text: itemText, done: false}];
            setList(newList);
            replaceLocalStorageItem('List', newList);
        },
        removeItem: (index: number) => {
            const newList = list.filter((item, i) => i !== index)
            setList(newList);

            replaceLocalStorageItem('List', newList);
        },
        toggleItem: (index: number) => {
            const item = list[index];
            
            if(item!== undefined){
                item.done = !item.done;
            }

            const newList = [...list]
            replaceLocalStorageItem('List', newList);
            setList(newList);
        }

      }
}