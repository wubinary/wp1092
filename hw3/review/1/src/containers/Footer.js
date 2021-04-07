import React, { Component } from "react"

class Footer extends Component {
    filterAll = () => {
        this.props.filterList('all');
    }

    filterActive = () => {
        this.props.filterList('active');
    }

    filterCompleted = () => {
        this.props.filterList('completed');
    }

    render () {
        let clear_button = "";
        if (this.props.haveCompleted > 0) {
            clear_button = (
                <div className="todo-app__clean" onClick={this.props.clearCompleted}>
                    <button>Clear completed</button>
                </div>
            );
        }
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">
                    {`${this.props.todoCount} left`}
                </div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.filterAll}>All</button>
                    <button onClick={this.filterActive}>Active</button>
                    <button onClick={this.filterCompleted}>Completed</button>
                </ul>
                {clear_button}
            </footer>
        )
    }
}

export default Footer
