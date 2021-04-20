import React from "react";


class Cell extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {editing: false};
        this.refinput = React.createRef();
    }

    handleChange = (event)=>{
        this.props.set_item(this.props.i, this.props.j, event.target.value);
    }

    onFocus = ()=>{
        this.setState({ editing: true }, () => {
            this.refinput.current.focus();
        });
    }

    onBlur = ()=>{
        this.setState({ editing: false });
    }

    render() {
        var i = this.props.i, j = this.props.j;
        return ( this.state.editing ?
            <input className="cell" onChange={this.handleChange} onBlur={this.onBlur} ref={this.refinput} type="text" /> :
            <div className="cell" onClick={this.onFocus}>{this.props.get_item(i,j)}</div> 
        );
    }
}

class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows:100, cols:26, 
                      cursor_i:0, cursor_j:0,
                      array: new Array(100).fill(0).map(() => new Array(26).fill("")) };
    }

    get_item = (i,j)=>{
        return this.state.array[i][j]==="" ? "":this.state.array[i][j];
    }

    set_item = (i,j,text)=>{
        var array = this.state.array;
        array[i][j] = text;
        this.setState({array: array});
    }

    get_table() {
        var rows = [], cols = [];

        for (var i = 0; i < this.state.rows; i++) {
            cols = [<th key={"idx:"+i} className="stickleft">{i}</th>];
            for (var j = 0; j < this.state.cols; j++) {
                cols.push(
                    <td key={"r:"+i+"c:"+j}>
                        <Cell i={i} j={j} get_item={this.get_item} set_item={this.set_item} />
                    </td>
                );
            }
            rows.push(<tr key={"r:"+i}>{cols}</tr>);
        }
        return rows;
    }

    get_col_index = ()=> {
        var cols = [[<th key="null"></th>]];
        for (var j = 65; j < 65+this.state.cols; j++ ) {
            cols.push(<th key={"idx:"+String.fromCharCode(j)} className="sticktop">{String.fromCharCode(j)}</th>);
        }
        return <tr key="colidx">{cols}</tr>;
    }

    render() {
        return (
            <div className="datagrid_container flex-row">
                <div className="datagrid_control datagrid_control_row">
                    <button></button>
                    <button className="sticktop stickleft" onClick={this.add_rows} > + </button>
                    <button className="sticktop stickleft" onClick={this.del_rows} > - </button>
                </div>
                <div className="flex-col">
                    <div className="datagrid_control datagrid_control_col">
                        <button className="stickleft sticktop" onClick={this.add_cols} > + </button>
                        <button className="stickleft sticktop" onClick={this.del_cols} > - </button>
                    </div>
                    <div className="datagrid_table">
                        <table>
                            <thead>
                                {this.get_col_index()}
                            </thead>
                            <tbody>
                                { this.get_table() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    add_rows = ()=>{ this.setState((state)=>({rows:state.rows+1})); }
    del_rows = ()=>{ this.setState((state)=>({rows:state.rows-1})); }
    add_cols = ()=>{ this.setState((state)=>({cols:state.cols+1})); }
    del_cols = ()=>{ this.setState((state)=>({cols:state.cols-1})); }
}

export default DataGrid;