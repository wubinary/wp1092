import React from "react";

class Footer extends React.Component{
    render(){

        let visible_value; 
        if((this.props.total_num - this.props.left_num) > 0){
            visible_value = "visible";
        }
        else if((this.props.total_num - this.props.left_num) <= 0){
            visible_value = "hidden";
        }
        
        console.log("display", visible_value);
        let clear_button = (
            <div className="todo-app__clean">
                <button onClick={this.props.removeFinished} style={{visibility: visible_value}}>Clear completed</button>
            </div>
        );

        return this.props.total_num > 0 && (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{this.props.left_num + " left"}</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={(e)=>{this.props.changeMode("all")}}>All</button>
                    <button onClick={(e)=>{this.props.changeMode("active")}}>Active</button>
                    <button onClick={(e)=>{this.props.changeMode("complete")}}>Completed</button>
                </ul>
                {clear_button}
            </footer>
        )
    }
}

export default Footer