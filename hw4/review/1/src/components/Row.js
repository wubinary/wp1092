import React, { Component } from "react";
import Cell from '../components/Cell';

const Row = props => {
    const cells = []
    const y = props.y
    let behighlighted = false
    let beselected = false
    let nextEnterInput = false

    for (let x = 0; x < props.x; x += 1) {
        if(y === 0 && x === props.cursor[0])
        {
            behighlighted = true
        }
        if(y === props.cursor[1] && x === 0)
        {
            behighlighted = true
        }
        if(x === props.cursor[0] && y === props.cursor[1])
        {
            beselected = true
        }
        cells.push(
            <Cell
            key={`${x}-${y}`}
            y={y}
            x={x}
            highlighted={behighlighted}
            selected={beselected}
            onChangedValue={props.handleChangedCell}
            updateCells={props.updateCells}
            onHandleCursor={props.handleCursor}
            value={props.rowData[x] || ''}
            />
        )
        behighlighted = false
        beselected = false
    }

    let totalWidth = 80*(props.x)

    return <div className="myRow" style={{width: totalWidth}}>{cells}</div>
  }
  export default Row