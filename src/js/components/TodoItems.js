import React, { Component } from "react";
import { ListGroup, ListGroupItem, Checkbox, Row, Col, Alert } from 'react-bootstrap';

var dateFormat = require('dateformat');

export default class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleTodos: this.props.visibleTodos
        };
    }

    // Render message if no tasks for todo
    getNoTodosMessage () {
        switch (this.props.visibilityFilter) {
            case "ALL_TODOS":
                return <div><strong>No tasks for today.</strong><br/><span>Enjoj your day.</span></div>;
            case "ACTIVE_TODOS":
                return <span>No active tasks</span>;
            case "COMPLETED_TODOS":
                return <span>No completed tasks</span>;
            default:
                return <div><strong>No tasks for today.</strong><br/><span>Enjoj your day.</span></div>;
        }
    }

    // Render HTML for Todo items  part 
    render() {
        return(
            <div className='todo-body'>
                {this.props.visibleTodos.length > 0?
                (
                    <ListGroup>
                        {this.props.visibleTodos.map(todo => (
                            <ListGroupItem key={todo.createdDate} className={todo.completed ? "completed" : ""}>
                                <Checkbox checked={todo.completed} onChange={() => this.props.completeTodo(todo)}>
                                    {todo.text}
                                </Checkbox>
                                <Row className='todo-item-date'>
                                    <Col xs={6}>
                                        {dateFormat(todo.createdDate, "dd/mm/yyyy HH:MM")}
                                    </Col>
                                    {
                                        todo.completedDate != null &&
                                        <Col xs={6}>
                                            {dateFormat(todo.completedDate, "dd/mm/yyyy HH:MM")}
                                        </Col>
                                    }
                                </Row>
                                <i className="remove-item glyphicon glyphicon-remove" onClick={() => this.props.removeTodo(todo)}></i>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ):
                (
                    <Alert bsStyle="success">
                        {this.getNoTodosMessage()}
                    </Alert>
                )}
            </div>
        );
    }
}