import React from "react";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Header from './Header';
import TodoItems from './TodoItems';
import Footer from './Footer';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.visibilityFilters = ["ALL_TODOS", "ACTIVE_TODOS", "COMPLETED_TODOS"]
        this.state = {
            todos: this.props.todoInterface.getAllTodos(),
            value: '',
            visibilityFilter: "ALL_TODOS"
        };
    }

    // Add to state any change on text input field
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    // Add todo to state and storage via interface
    addTodo(e) {
        e.preventDefault();

        if (this.state.value.length > 0) {
            this.props.todoInterface.addTodo(this.state.value);
            this.setState({todos: this.props.todoInterface.getAllTodos()});
            this.state.value = ''; 
        }
    }

    // Complete todo and save it to state and storage via interface
    completeTodo(todo, type) {
        this.props.todoInterface.completeTodo(todo.id);
        this.setState({todos: this.props.todoInterface.getAllTodos()});
    }

    // Complete all todos
    completeAll() {
        let visibleTodos = this.visibleTodos();
        visibleTodos.forEach(todo => {
            if(!todo.completed) {
                this.props.todoInterface.completeTodo(todo.id);
            }
        });
        this.setState({todos: this.props.todoInterface.getAllTodos()});
    }

    // Remove todo and save it to state and storage via interface
    removeTodo(todo) {
        this.props.todoInterface.removeTodo(todo.id);
        this.setState({todos: this.props.todoInterface.getAllTodos()});
    }

    // Complete all todos
    removeCompleted() {
        let visibleTodos = this.visibleTodos();
        visibleTodos.forEach(todo => {
            if(todo.completed) {
                this.props.todoInterface.removeTodo(todo.id);
            }
        });
        this.setState({todos: this.props.todoInterface.getAllTodos()});
    }

    // Set visiblity filter
    changeVisibilityFilter(value) {
        this.setState({visibilityFilter: value});
    }

    // Choose filter and prepare todo list
    visibleTodos () {
        switch (this.state.visibilityFilter) {
            case "ALL_TODOS":
                return this.state.todos;
            case "ACTIVE_TODOS":
                return this.state.todos.filter(todo => !todo.completed);
            case "COMPLETED_TODOS":
                return this.state.todos.filter(todo => todo.completed);
            default:
                return this.state.todos;
        }
    }

    // Render html
    render() {
        const visibilityFilter = this.state.visibilityFilter;
        let visibleTodos = this.visibleTodos();
        return (
            <div id="todo" className="todo">
                {/* Header Component */}
                <Header 
                    visibleTodos={visibleTodos}
                    completeAll={() => this.completeAll()}
                    removeCompleted={() => this.removeCompleted()}
                    changeVisibilityFilter = {t => this.changeVisibilityFilter(t)}
                    visibilityFilter = {this.state.visibilityFilter}
                    />
                {/* Navigarion (Visiblity) Component */}
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Show:
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav className="navbar navbar-light">
                        <NavItem className={visibilityFilter === "ALL_TODOS" ? "active" : ""} 
                            onClick={() => this.changeVisibilityFilter("ALL_TODOS")}>
                            All
                        </NavItem>
                        <NavItem className={visibilityFilter === "ACTIVE_TODOS" ? "active" : ""} 
                            onClick={() => this.changeVisibilityFilter("ACTIVE_TODOS")}>
                            Active
                        </NavItem>
                        <NavItem className={visibilityFilter === "COMPLETED_TODOS" ? "active" : ""}
                            onClick={() => this.changeVisibilityFilter("COMPLETED_TODOS")}>
                            Completed
                        </NavItem>
                    </Nav>
                </Navbar>
                {/* Items Component */}
                <TodoItems 
                    visibleTodos={visibleTodos}
                    completeTodo={t => this.completeTodo(t)}
                    removeTodo={t => this.removeTodo(t)}
                    />
                {/* Footer Component */}
                <Footer 
                    value={this.state.value}
                    addTodo={e => this.addTodo(e)}
                    handleChange={e => this.handleChange(e)}
                    />
            </div>
        );
    }
}