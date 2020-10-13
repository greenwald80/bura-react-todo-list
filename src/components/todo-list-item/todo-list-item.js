import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone,done, important } = this.props;
    let classnames = "todo-list-item";

    if (done) {
      //если выполнено, то должно быть зачеркнуто
      classnames += " done";
    }

    if (important) {
      //если выделено, то должно быть жирным
      classnames += " important";
    }

    return (
      <span className={classnames}>
        <span className="todo-list-item-label" 
        onClick={onToggleDone}
        >
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
