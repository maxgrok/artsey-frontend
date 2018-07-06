import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import SimpleCard from './Components/simplecard';
import Layout from "./Components/layout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
