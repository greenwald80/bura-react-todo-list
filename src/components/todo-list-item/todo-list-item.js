import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {
  // constructor() {
  //   super();
  //   this.onLabelClick = () => {
  //     console.log(`Done: ${this.props.label}`);
  //   };
  // }
  onLabelClick = () => {//using proposal class fields
    console.log(`Done: ${this.props.label}`);
  };

  render() {
    const { label, important = false } = this.props;
    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal",
    };
    return (
      <span className="todo-list-item">
        <span
          style={style}
          className="todo-list-item-label"
          onClick={this.onLabelClick.bind(this)}
        >
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
