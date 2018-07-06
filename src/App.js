import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleCard from './Components/simplecard';
import Layout from './Components/layout';

class App extends Component {
  render() {
    const name="Degas"
    const period="Impressionism"

    return (
      <div className="App">
      <h1 style={{textAlign:"left", marginLeft: "25px"}}>Artsey</h1>
        <Layout name={name} period={period} />
      </div>
    );
  }
}

export default App;
