import React, { Component } from "react";
import Table from '../components/Table'

class FakeSheet extends Component {

    state = {
        row_count: 100,
        col_count: 26
    }

    childRef= React.createRef();

    handleAddRow = () => {
        const tableRef = this.childRef.current;
        let cur_cor = tableRef.state.cursor
        let newData = {}
        if((tableRef.state.cursor[0] === -1) && (tableRef.state.cursor[1] === -1))
        {
            this.setState({ row_count: this.state.row_count+1 })
        }
        else
        {
            //tableRef.setState({data: {1 : {1: 'test'}}})
            for(const data_row in tableRef.state.data)
            {
                //console.log(data_row, tableRef.state.data[data_row])
                if(data_row >= cur_cor[1])
                {
                    newData[(parseInt(data_row)+1).toString()] = tableRef.state.data[data_row]
                }
                else
                {
                    newData[data_row] = tableRef.state.data[data_row]
                }
            }
            tableRef.setState({data: newData})
            this.setState({ row_count: this.state.row_count+1 })
        }
    }

    handleDelRow = () => {
        const tableRef = this.childRef.current;
        let cur_cor = tableRef.state.cursor
        let newData = {}
        if(cur_cor[1] > this.state.row_count)
        {
            /*if(this.state.row_count > 1)
            {
            this.setState({ row_count: this.state.row_count-1 })
            }*/
        }
        else
        {
            //tableRef.setState({data: {1 : {1: 'test'}}})
            for(const data_row in tableRef.state.data)
            {
                //console.log(data_row, tableRef.state.data[data_row])
                if(data_row > cur_cor[1])
                {
                    newData[(parseInt(data_row)-1).toString()] = tableRef.state.data[data_row]
                }
                else if(parseInt(data_row) === cur_cor[1])
                {
                    newData[data_row] = {}
                }
                else
                {
                    newData[data_row] = tableRef.state.data[data_row]
                }
                
            }
            tableRef.setState({data: newData})
            if(this.state.row_count > 1)
            {
                this.setState({ row_count: this.state.row_count-1 })
            }
        }
    }

    handleAddCol = () => {
        const tableRef = this.childRef.current;
        let cur_cor = tableRef.state.cursor
        let newData = {}
        if((tableRef.state.cursor[0] === -1) && (tableRef.state.cursor[1] === -1))
        {
            this.setState({ col_count: this.state.col_count+1 })
        }
        else
        {
            //tableRef.setState({data: {1 : {1: 'test'}}})
            for(const data_row in tableRef.state.data)
            {
                let newRow = {}
                //console.log(data_row, tableRef.state.data[data_row])
                for(const data_col in tableRef.state.data[data_row])
                {
                    if(data_col >= cur_cor[0])
                    {
                        newRow[(parseInt(data_col)+1).toString()] = tableRef.state.data[data_row][data_col]
                    }
                    else
                    {
                        newRow[data_col] = tableRef.state.data[data_row][data_col]
                    }
                }
                newData[data_row] = newRow
            }
            tableRef.setState({data: newData})
            this.setState({ col_count: this.state.col_count+1 })
        }
    }

    handleDelCol = () => {
        const tableRef = this.childRef.current;
        let cur_cor = tableRef.state.cursor
        let newData = {}
        if(cur_cor[0] > this.state.col_count)
        {
            /*if(this.state.col_count > 1)
            {
                this.setState({ col_count: this.state.col_count-1 })
            }*/
        }
        else
        {
            for(const data_row in tableRef.state.data)
            {
                let newRow = {}
                //console.log(data_row, tableRef.state.data[data_row])
                for(const data_col in tableRef.state.data[data_row])
                {
                    if(data_col > cur_cor[0])
                    {
                        newRow[(parseInt(data_col)-1).toString()] = tableRef.state.data[data_row][data_col]
                    }
                    else if(parseInt(data_col) === cur_cor[0])
                    {
                        newRow[data_col] = ""
                    }
                    else
                    {
                        newRow[data_col] = tableRef.state.data[data_row][data_col]
                    }
                }
                newData[data_row] = newRow
            }
            tableRef.setState({data: newData})
            if(this.state.col_count > 1)
            {
                this.setState({ col_count: this.state.col_count-1 })
            }
        }
    }

    render() {
        return (
            <>
                <div>
                    <div id="topButton">
                        <button type="button" onClick={this.handleAddCol}>+</button>
                        <button type="button" onClick={this.handleDelCol}>-</button>
                    </div>
                    <div className="mainContainer">
                        <div id="leftButton">
                            <button onClick={this.handleAddRow}>+</button>
                            <button onClick={this.handleDelRow}>-</button>
                        </div>
                        <div className="myTable" >
                            <Table x={this.state.col_count} y={this.state.row_count} ref={this.childRef} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FakeSheet;

