import React, { Component } from 'react'

class Station extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="station-line-container">
        <div className="station-and-name"> {/* you should add both id and onClick to attributes */}
          <div className="station-rectangle"></div>
          <div className="station-name"></div>
        </div>
        <div className="line"></div> {/* you should add id to attributes */}
      </div>
    )
  }
}

export default Station
