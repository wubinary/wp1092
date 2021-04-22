import React from 'react'
import Cell from './Cell'
const Row = props => {
  const cells = []
  const y = props.y // y is the row data
  for (let x = 0; x < props.x; x += 1) {
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        onChangedValue={props.handleChangedCell}
        updateCells={props.updateCells}
        onClickedPosition={props.handleClickedPosition}
        value={props.rowData[x] || ''}
      />
    )
  }
  return <div id='row'>{cells}</div>
}
export default Row