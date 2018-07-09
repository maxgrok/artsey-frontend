import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import SimpleCard from './Components/simplecard';
import PageLayout from "./Components/PageLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <PageLayout />
      </div>
    );
  }
}

export default App;
