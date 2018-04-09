import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleTodos: this.props.visibleTodos
        };
    }
    
    // Render HTML for header part 
    render () {
        const visibleTodos = this.props.visibleTodos;
		return (
            <div className='todo-header'>
                <div className="header-info-wrapper">
                    <div className='header-info'>
                        {visibleTodos.filter(todo => todo.completed).length} / {visibleTodos.length} completed
                    </div>
                    <div className={visibleTodos.length ? 'header-buttons' : 'header-buttons hide' }>
                        <span className='complete-all' onClick={() => this.props.completeAll()} title="Complete All">
                            <i className="glyphicon glyphicon-ok"></i>
                        </span>
                        <span className='remove-all' onClick={() => this.props.removeCompleted()} title="Remove Completed">
                            <i className="glyphicon glyphicon-trash"></i>
                        </span>
                    </div>
                </div>
            </div>
        )
	}
}