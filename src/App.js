import React, { Component } from 'react';
import MainMap from './components/map.jsx';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {'data': null}
    this.loadData.bind(this)
  }
  render() {
    return (
      <div className="App">
        < MainMap />
      </div>
    );
  }
}

export default App;
