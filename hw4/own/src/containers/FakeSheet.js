import React, { Component } from "react";
import Header from "../components/Header.js";
import DataGrid from "../components/DataGrid.js";

class FakeSheet extends Component {
    render() {
        return (
            <div>
                <input type="text" />
                <DataGrid />
            </div>
        );
    }
}

export default FakeSheet;

