import { useState } from "react";
import { getLocalStorageItem, replaceLocalStorageItem } from "./Storage";
import { api } from "../trpc/react";

export type ToDoItem = {
  id: number;
  text:string;
  done:boolean;
}

/**
 * Handles state management for the todo list
 */
export const useToDoList = () => {

      const toggleToDoItemMutation = api.toDoItem.toggleToDoItem.useMutation();
      const deleteToDoItemMutation = api.toDoItem.deleteToDoItem.useMutation();

      //checking if data (List with capital L) exists in localStorage
      const [list, setList] = useState<ToDoItem[]>(getLocalStorageItem("List") ?? []); //if 'List' is undefined, use an empty array
      //this statement basically means, 'use this if it exists (List), and if not use this other thing (that appears after the ??)'

      return {
        list,
        addItem: (item: ToDoItem) => {
            const newList = [...list, item];
            setList(newList);
            replaceLocalStorageItem('List', newList);
        },

        removeItem: (index: number) => {
            const item = list[index];
            if (!item) return;

            //update database
            deleteToDoItemMutation.mutate({ id: item.id });

            //update local state
            const newList = list.filter((_, i) => i !== index);
            setList(newList);
            replaceLocalStorageItem("List", newList);
        },


        toggleItem: (index: number) => {
            const item = list[index];
            if (!item) return;

            const updatedDone = !item.done;

            const newList = [...list];
            newList[index] = { ...item, done: updatedDone };
            setList(newList);
            replaceLocalStorageItem("List", newList);

            toggleToDoItemMutation.mutate({ id: item.id, done: updatedDone });
          },
        };
      };