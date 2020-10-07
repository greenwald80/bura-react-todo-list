import React from "react";
import ReactDOM from "react-dom";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import "./app.css";

const App = () => {
  const todoData = [
    { label: "Item 1", important: false, id: 1 },
    { label: "Item 2", important: true, id: 2 },
    { label: "Item 3", important: false, id: 3 },
  ];

  return (
    <div>
      <AppHeader />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      <TodoList todos={todoData} />
    </div>
  );
};

export default App;
