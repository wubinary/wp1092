import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";


class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoItems: [], 
            left_num: 0, 
            mode: "all"
        };
        this.addToList = this.addToList.bind(this);
        this.popFromList = this.popFromList.bind(this);
        this.changeTaskStatus = this.changeTaskStatus.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.removeFinished = this.removeFinished.bind(this);
    }
    
    addToList(task){
        this.setState((state) => {
            state.todoItems = Array.from(state.todoItems);
            state.todoItems.push({
                task: task, 
                isFinished: false
            });

            return {
                todoItems: state.todoItems, 
                left_num: state.left_num + 1
            }
        }) 
    }

    popFromList(event, idx){
        let left_array = [...this.state.todoItems]
        let removeItem = left_array.splice(idx, 1)[0];
        let decrement = removeItem.isFinished === true? 0: 1;

        this.setState((state) => ({
            todoItems: left_array, 
            left_num: state.left_num - decrement
        })) 
    }

    changeTaskStatus(idx){
        let todoItems = [...this.state.todoItems]
        todoItems[idx].isFinished = !todoItems[idx].isFinished
        if(todoItems[idx].isFinished === true){
            var increment = -1
        }
        else if(todoItems[idx].isFinished === false){
            var increment = 1
        }

        this.setState((state) => ({
            todoItems: state.todoItems, 
            left_num: state.left_num + increment
        }))
    }

    changeMode(mode){
        this.setState((state) => ({
            mode: mode, 
        }))
    }

    removeFinished(){
        let unfinishedItems = []
        for(var i = 0; i < this.state.todoItems.length; i++){
            if(!this.state.todoItems[i].isFinished){
                unfinishedItems.push(this.state.todoItems[i]);
            }
        }

        this.setState((state) => ({
            todoItems: unfinishedItems, 
            left_num: unfinishedItems.length, 
        }))
    }

    render() {
        let displayItems = [];
        for(var i = 0; i < this.state.todoItems.length; i++){
            if(this.state.mode === "active" && this.state.todoItems[i].isFinished){
                continue;
            }
            else if(this.state.mode === "complete" && !this.state.todoItems[i].isFinished){
                continue;
            }

            let displayItem = {...this.state.todoItems[i]};
            displayItem["idx"] = i;
            displayItems.push(displayItem);
        }


        return (
            <>
                <Header text="todos" />
                <Section addToList={this.addToList} 
                         popFromList={this.popFromList} 
                         changeTaskStatus = {this.changeTaskStatus}
                         displayItems={displayItems}/>
                <Footer total_num={this.state.todoItems.length}
                        left_num={this.state.left_num}
                        changeMode={this.changeMode}
                        removeFinished={this.removeFinished}
                        />  
            </>
        );
    }
}

export default TodoApp;
