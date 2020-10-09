import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import "./app.css";

export default class App extends Component {
  state = {
    todoData: [
      { label: "Item 1", important: false, id: 1 },
      { label: "Item 2", important: true, id: 2 },
      { label: "Item 3", important: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      //todoData.splice(idx, 1); //удаляет 1 элемент массива по указанному индексу, но нельзя изменять существующий стейт
      //const before = todoData.splice(0,idx);//сохраняет в отдельный массив все элементы от нулевого элемента до idx
      //const after = todoData.splice(idx+1)//сохраняет в отдельный массив все элементы после указанного индекса
      //const newArray = [...before,...after];
      const newArray = [
        ...todoData.splice(0, idx),
        ...todoData.splice(idx + 1),
      ]; //более короткая запись
      return { todoData: newArray };
    });
  };

  render() {
    return (
      <div className="todo-app">
        <AppHeader />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
      </div>
    );
  }
}
