import React, { Component } from "react";
import Header from "../components/Header";
import MainSection from "./MainSection"

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <MainSection />
            </>
        );
    }
}

export default TodoApp;
