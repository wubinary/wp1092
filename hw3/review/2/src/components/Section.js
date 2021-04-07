import React from "react";

class Section extends React.Component{

    HandleSubmit(event){
        if(event.keyCode === 13){
            let user_input = document.getElementsByClassName("todo-app__input")[0];
            let input_value = user_input.value;
            
            user_input.value = "";
            this.props.addToList(input_value);
        }
    }

    onCheckboxClick(option_idx, item_idx){
        this.props.changeTaskStatus(item_idx);
    }

    render(){
        let Lists = this.props.displayItems.map((item, option_idx)=>{
            let status = item.isFinished? "finished": "unfinished";
            return (
                <li className={"todo-app__item " + status} index={option_idx}>
                    <div className="todo-app__checkbox">
                        <input type="checkbox" id={option_idx} onClick={this.onCheckboxClick.bind(this, option_idx, item.idx)} checked={item.isFinished}/>
                        <label for={option_idx}></label>
                    </div>
                    <h1 className="todo-app__item-detail">{item.task}</h1>
                    <img src="./img/x.png" alt="" className="todo-app__item-x" onClick={(e) => {this.props.popFromList(e, item.idx);}}/>
                </li>
            )
        });


        return (
            <section className="todo-app__main">
            <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.HandleSubmit.bind(this)}></input>            
            {this.props.displayItems.length > 0 &&
                <ul className="todo-app__list" id="todo-list">
                    {Lists}
                </ul>
            }
            </section>
        )
    }
}

export default Section