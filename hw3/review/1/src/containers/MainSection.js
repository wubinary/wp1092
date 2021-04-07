import React, { Component } from "react";
import Footer from "./Footer";
import TodoList from "../components/TodoList";

class MainSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            todo_list: [],
            completed_count: 0,
            filter_list: []
        };
    }

    clearCompleted = () => {
        let old_list = this.state.todo_list;
        old_list = old_list.filter(
            i => i.cross === false
        );
        console.log(old_list);
        this.setState({
            todo_list: old_list,
            filter_list: old_list
        });
    }

    submitInput = (e) => {
        if (e.key === 'Enter') {
            let target = document.getElementsByClassName('todo-app__input')[0];
            const input_value = {
                text: target.value,
                cross: false
            };
            if(input_value.text !== ""){
                this.setState({
                    todo_list: this.state.todo_list.concat([input_value]),
                    filter_list: this.state.todo_list.concat([input_value])
                });
                target.value = "";
            }
        }
    }

    crossOut = (index) => {
        let old_list = this.state.todo_list;

        if (old_list[index].cross === true) {
            this.setState({
                completed_count: this.state.completed_count - 1
            })
        } else {
            this.setState({
                completed_count: this.state.completed_count + 1
            })
        }
        old_list[index].cross = !old_list[index].cross;

        this.setState({
            todo_list: old_list
        })
    }

    deleteItem = (index) => {
        let old_list = this.state.todo_list;
        old_list.splice(index, 1);
        this.setState({
            todo_list: old_list
        });
    }

    filterList = (mode) => {
        let temp_list = this.state.todo_list;

        if (mode === "all") {
            this.setState({
                filter_list: temp_list
            });
        } else if (mode === "active") {
            this.setState({
                filter_list: temp_list.filter(
                    i => i.cross === false
                )
            });
        } else {
            // completed
            this.setState({
                filter_list: temp_list.filter(
                    i => i.cross === true
                )
            });
        }
    }

    render () {
        let current_list = "", my_footer = "";
        if (this.state.todo_list.length > 0) {
            current_list = <TodoList
                                content={this.state.filter_list}
                                deleteItem={this.deleteItem}
                                crossOut={this.crossOut}
                           />;
            my_footer = <Footer
                            todoCount={this.state.todo_list.filter(i => i.cross === false).length}
                            clearCompleted={this.clearCompleted}
                            haveCompleted={this.state.completed_count}
                            filterList={this.filterList}
                        />;
        }
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" onKeyUp={this.submitInput}/>
                {current_list}
                {my_footer}
            </section>
        )
    }
}

export default MainSection
