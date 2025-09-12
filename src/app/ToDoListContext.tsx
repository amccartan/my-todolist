import {createContext} from 'react';
import { useToDoList } from './useToDoList';

export const ToDoContext = createContext<ReturnType<typeof useToDoList>>(
    {
        list: [],
        addItem: () => {},
        removeItem: () => {},
        toggleItem: () => {}
    }
);