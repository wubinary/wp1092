import React from "react";
import Table from "./Table"
export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (<div>
                    <Table x={26} y={100}/>
                </div>)
    }
}