import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import SimpleCard from './Components/simplecard';
import Layout from './Components/layout';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      searchTerm: "edgar-degas"
    }
  }
  render() {
   
    return (
      <div className="App">
        <Layout searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
