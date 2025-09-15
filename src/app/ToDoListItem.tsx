import { ToDoContext } from './ToDoListContext';
import {useContext} from 'react';
import { type ToDoItem } from './useToDoList';

type ToDoListItemProps = {
    item:ToDoItem;
}

export const ToDoListItem = ({item}:ToDoListItemProps) => {

const listUsingContext = useContext(ToDoContext);
const indexUsingContext = listUsingContext.list.findIndex(i => i === item);

return(
          <li key={indexUsingContext}> {/* index is incremented automatically by map */}
            <div>
              <span style={{textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'red': 'black'}}> {/* line through task when it's done */}
                {item.text}, task {indexUsingContext+1} of {listUsingContext.list.length}
              </span>
            </div>
          </li>
      )
}