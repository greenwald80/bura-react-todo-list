import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default class App extends Component {
  maxId = 100;

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

  addItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++,
    };
    this.setState(({ todoData }) => {
      //todoData.push(newItem);//НЕЛЬЗЯ изменять существующий стэйт в реакте
      const newArr = [...todoData, newItem]; //добавляет новый элемент в конец существующего массива
      return { todoData: newArr };
    });
  };

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
