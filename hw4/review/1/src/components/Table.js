import React, { Component } from "react";
import Row from '../components/Row';

export default class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: {},
        cursor: [-1, -1],
      }
    }

    handleChangedCell = ({ x, y }, value) => {
        const modifiedData = Object.assign({}, this.state.data)
        if (!modifiedData[y]) modifiedData[y] = {}
        modifiedData[y][x] = value
        this.setState({ data: modifiedData })
    }

    handleCursor = (cursor_cor) => {
      if(cursor_cor[1] <= this.props.y)
      {
        this.setState({ cursor: cursor_cor })
      }
      else
      {
        this.setState({ cursor: [cursor_cor[0], cursor_cor[1]-1] })
      }
    }

    updateCells = () => {
        console.log("updated")
        this.forceUpdate()
    }

    render() {
      const rows = []
      for (let y = 0; y < this.props.y + 1; y += 1) {
        const rowData = this.state.data[y] || {}
        rows.push(
          <Row
            handleChangedCell={this.handleChangedCell}
            handleCursor={this.handleCursor}
            updateCells={this.updateCells}
            key={y}
            y={y}
            x={this.props.x + 1}
            cursor={this.state.cursor}
            rowData={rowData}
          />
        )
      }
      return <div>{rows}</div>
    }
  }
