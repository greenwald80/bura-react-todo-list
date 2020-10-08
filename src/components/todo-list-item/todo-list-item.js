import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {
  
  //state - добавляю для сохранения состояния
  // constructor(){
  //   super();
  //   this.state={
  //     done:false
  //   };
  // }
  state = {
    //без использования конструктора (можно в последней версии языка)
    done: false,
  };

  // constructor() {
  //   super();
  //   this.onLabelClick = () => {
  //     console.log(`Done: ${this.props.label}`);
  //   };
  // }
  onLabelClick = () => {
    //using proposal class fields
   this.setState({
     done:true
   });
  };

  render() {
    const { label, important = false } = this.props;
    const { done } = this.state;
    let classnames = "todo-list-item";
    if (done) {
      classnames += " done";
    }

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal",
    };
    return (
      <span className={classnames}>
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
