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
      // { label: "Item 1", important: false, id: 1 },
      // { label: "Item 2", important: true, id: 2 },
      // { label: "Item 3", important: false, id: 3 },
      this.createTodoItem("Item 1"),
      this.createTodoItem("Item 2"),
      this.createTodoItem("Item 3"),
    ],
    term: "",
    filter: "all", //active,done,all
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

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
    // const newItem = {
    //   label: text,
    //   important: false,
    //   id: this.maxId++,
    // };
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      //todoData.push(newItem);//НЕЛЬЗЯ изменять существующий стэйт в реакте
      const newArr = [...todoData, newItem]; //добавляет новый элемент в конец существующего массива
      return { todoData: newArr };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    //1. update object
    const oldItem = arr[idx];
    //создаю новый объект и изменяю в нем одно done значение на обратное
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    //2. construct new array
    // const newArray = [
    //   ...arr.splice(0, idx),
    //   newItem,
    //   ...arr.splice(idx + 1),
    // ];
    //разделяю массив, вставляю новое значение в середину массива
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  // onToggleDone = (id) => {
  //   this.setState(({ todoData }) => {
  //     const idx = todoData.findIndex((el) => el.id === id);
  //     //1. update object
  //     const oldItem = todoData[idx];
  //     const newItem = { ...oldItem, done: !oldItem.done }; //создаю новый объект и изменяю в нем одно done значение на обратное
  //     //2. construct new array
  //     const newArray = [
  //       ...todoData.splice(0, idx),
  //       newItem,
  //       ...todoData.splice(idx + 1),
  //     ]; //разделяю массив, вставляю новое значение в середину массива
  //     return {
  //       todoData: newArray,
  //     };
  //     // return {
  //     //   //using external function toggleProperty
  //     //   todoData: this.toggleProperty(todoData, id, "done"),
  //     // };
  //   });
  // };
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  search(items, term) {
    //если ничего не введено, то возвращает все абсолютно элементы
    if (term.length === 0) {
      return items;
    }
    //вернет значение, если строка содержится, или -1 если строка не содержится
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
