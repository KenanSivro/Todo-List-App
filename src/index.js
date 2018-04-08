import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/todo.css';
import TodoApp from "./js/components/TodoApp";
import TodoInterface from './js/interfaces/TodoInterface';

// New Interface instance
const todoInterface = new TodoInterface();

// Render TodoApp and inject to HTML element (id=root)
ReactDOM.render(
    <TodoApp todoInterface={todoInterface} />, 
    document.getElementById("root"));