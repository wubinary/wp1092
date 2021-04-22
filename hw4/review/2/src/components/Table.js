import React from 'react'
import Row from './Row'
export default class Table extends React.Component {
  constructor(props) {
    super(props)
    let data = {}
    for(let k=0; k<this.props.y+1; k++){
        data[k] = {}
    }
    this.state = {
      data: data,
      current_x: 0,
      current_y: 0,
      dynamic_y: this.props.y
    }
  }
  handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, this.state.data)
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    this.setState({ data: modifiedData })
  }
  updateCells = () => {
    this.forceUpdate()
  }

  handleClickedPosition = (x, y) => {
      this.setState({current_x: x, current_y: y})
      console.log(x)
      console.log(y)
  }

   handleDeleteRow = () => {
       let y = this.state.current_y
       let new_data = {}
       let current_cnt = 0
       let current_old_cnt = 0
       console.log(this.state.data)
       for(let k=0; k<Object.keys(this.state.data).length; k++){
           console.log(k)
           if(current_old_cnt != y){
               new_data[current_cnt] = this.state.data[current_old_cnt]
               current_cnt += 1
               // console.log('HOHO')
               // console.log(current_cnt)
               current_old_cnt += 1
           }
           else{
               console.log(y)
               console.log('YOLO')
               current_old_cnt += 1
           }
       }
       console.log(this.state.data)
       console.log(new_data)
       this.setState({data: new_data, dynamic_y: this.state.dynamic_y - 1})
   }

   handleAddRow = () => {
    let y = this.state.current_y
    let new_data = {}
    let current_cnt = 0
    let current_old_cnt = 0
    for(let k=0; k<Object.keys(this.state.data).length; k++){
        if(current_old_cnt != y){
            new_data[current_cnt] = this.state.data[current_old_cnt]
            current_cnt += 1
            current_old_cnt += 1
        }
        else{
            new_data[current_cnt] = this.state.data[current_old_cnt]
            new_data[current_cnt+1] = {}
            current_cnt += 2
            current_old_cnt += 1
        }
    }
    this.setState({data: new_data, dynamic_y: this.state.dynamic_y + 1})
   }

  render() {
    const rows = [] // row is a js array
    for (let y = 0; y < this.state.dynamic_y + 1; y += 1) { //error
      const rowData = this.state.data[y] || {} // row index or empty dict
      console.log(rowData)
      rows.push(
        <Row
          handleChangedCell={this.handleChangedCell}
          updateCells={this.updateCells}
          handleClickedPosition={this.handleClickedPosition}
          key={y}
          y={y}
          x={this.props.x + 1}
          rowData={rowData}
        /> // push row element into array
      )
    }
    return (<div>
                <button onClick={this.handleDeleteRow}>Delete</button>
                <button onClick={this.handleAddRow}>Add</button>
                {rows}
            </div> // this enumerates over the array and expose its html element
    )
  }
}