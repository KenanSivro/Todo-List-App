import TodoModel from '../models/TodoModel';
import Helper from '../helpers/Helper';
import { findIndex } from 'lodash';

const helper = new Helper();

export default class TodoInterface {
    constructor() {
        this.todos = [];
    }

    // Add new todo to localstorage
    addTodo(text) {
        const newTodo = new TodoModel(text);
        this.todos.push(newTodo);

        helper.setStorage("todos", this.todos);
        return newTodo;
    }

    // Complete todo and update localstorage
    completeTodo(todoId) {
        const todoIndex = findIndex(this.todos, (todo) => todo.id === todoId);
        if (todoIndex > -1) {
            this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
            if(this.todos[todoIndex].completed) {
                this.todos[todoIndex].completedDate = new Date();
            } else {
                this.todos[todoIndex].completedDate = null;
            }
        }

        helper.setStorage("todos", this.todos);
    }

    // Remove todo from localstorage
    removeTodo(todoId) {
        const todoIndex = findIndex(this.todos, (todo) => todo.id === todoId);
        if (todoIndex > -1) {
            this.todos.splice(todoIndex, 1);
        }

        helper.setStorage("todos", this.todos);
    }

    // Get all todos from localstorage
    getAllTodos() {
        this.todos = helper.getStorage("todos") || [];
        return this.todos.map(todo => todo);
    }
}