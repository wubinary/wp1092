import React, { Component } from 'react'
import RouteGraph from '../components/routeGraph'
import StationInfo from '../components/stationInfo'
import axios from 'axios'
import '../styles/App.css'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      // sample structure of data
      // data: {
      //   R: [],
      //   G: []
      // }
      current_station_id: 'None',
      start_station: '',
      end_station: '',
      distance: -2
    }
  }

  getStations = () => {
    // fetch data from database via backend
    // coding here ...
    //const { data: {msg} } = instance.get()
  }

  calculateDistance = async () => {
    // send start and end stations to backend and get distance
    // coding here ...
  }

  // fetch data here after 1st render
  // coding here ...

  render() {
    let station_info = null

    if (!Object.keys(this.state.data).length) {
      return (
        <div className="wrapper">
          <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
        </div>
      )
    }

    return (
      <div className="wrapper">
        <div className="welcome-title"><h1>Welcome to MRT Distance Calculator !</h1></div>
        <div className="calculator-container">
          <div className="mode-selector">
            
            <span id="start-station-span">起始站</span>
            <select id="start-select" className="start-station"> {/* you should add both onChange and value to attributes */}
              <option></option>
              {
                // generate options of all stations within option group
                // coding here ...
              }
            </select>

            <span id="end-station-span">終點站</span>
            <select id="end-select" className="end-station"> {/* you should add both onChange and value to attributes */}
              <option></option>
              {
                // generate options of all stations within option group
                // coding here ...
              }
            </select>

            <button onClick={this.calculateDistance} id="search-btn">查詢距離</button>
            <span id="answer"> {/* you should add className to attributes */}
              {this.state.distance}
            </span>
            <span id="answer-postfix">KM</span>
          </div>

          <div className="route-graph-info-container">
            <RouteGraph route_data={{}} /> {/* you should pass data to child component with your own customized parameters */}
            <RouteGraph route_data={{}} /> {/* you should pass data to child component with your own customized parameters */}
            <StationInfo /> {/* you should pass data to child component with your own customized parameters */}
          </div>
          
        </div>
      </div>
    )
  }
}

export default App
