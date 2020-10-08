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
    important: false,
  };

  // constructor() {
  //   super();
  //   this.onLabelClick = () => {
  //     console.log(`Done: ${this.props.label}`);
  //   };
  // }
  onLabelClick = () => {
    //using proposal class fields
    // this.setState({
    //   done: true,
    // });
    this.setState(({done}) => {
      return {
        done: !done,
      };
    });
  };

  //используя последний синтаксис полей класса
  onMarkImportant = () => {
    // this.setState((state) => {
    //   return {
    //     important: !state.important,
    //   };
    // });
    this.setState(({important}) => {//используя сразу деструктуризацию из стейта (более лаконично)
      return {
        important: !important,
      };
    });
  };

  render() {
    const { label } = this.props;
    const { done, important } = this.state;
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
        <span className="todo-list-item-label" onClick={this.onLabelClick}>
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={this.onMarkImportant}
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
