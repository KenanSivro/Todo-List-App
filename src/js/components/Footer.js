import React from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    // Render HTML for Todo items  part 
    render () {
        return (
            <div className="todo-footer">
                <form className='todo-form' onSubmit={e => this.props.addTodo(e)}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            id="new-todo"
                            placeholder='New Task'
                            value={this.props.value}
                            onChange={e => this.props.handleChange(e)}
                        />
                        <InputGroup.Button>
                            <Button type="submit" bsClass="btn btn-primary">Add</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </form>
            </div>
        )
	}
}