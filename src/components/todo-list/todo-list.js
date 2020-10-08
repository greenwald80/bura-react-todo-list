import React from "react";
import TodoListItem from "../todo-list-item";
import './todo-list.css';

const TodoList = ({ todos,onDeleted }) => {
  const elements = todos.map((item) => {
    // return (
    //   <li>
    //     <TodoListItem label={item.label} important={item.important} />
    //   </li>
    // );
    // return (//the same using spread operator
    //       <li key={item.id}>
    //         <TodoListItem {...item} />
    //       </li>
    //     );
    const { id, ...itemProps } = item; //itemProps doesn't have id
    return (
      //using spread operator
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps} onDeleted={()=>onDeleted(id)}/>
      </li>
    );
  });
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
