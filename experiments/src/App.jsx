import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ExperimentsContainer from './components/ExperimentsContainer.jsx'
import './App.css';

// const d3 = require('d3');
const axios = require('axios');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'orgs': [],
      'elections': [],
      'dems': []
    }
  }

  function getData (table, json) {
    axios({
      method:'post',
      url: `localhost:8080/table/${table}/`,
      json: json
    })
  }

  const attGets = {
    'orgs': {'unique': true, 'columns': ['org']},
    'elections': {'unique': true, 'columns': ['election']},
    'dems': {'unique', true, 'columns': ['dem1']},
  }

  componentDidMount() {
    let jsonFilters = Object.values(attGets)
    let attributes = Object.keys(attGets)
    let promises = jsonFilters.map(e => getData(e))

    Promise.all(promises)
      .then(values => {
        values.map((value, index) => this.setState(attributes[index], value))
      })
  }

  render() {
    return (
      <div className="App">
        <ExperimentsContainer {...this.props} />
      </div>
    );
  }
}

// const AppWithRouter = withRouter(App)
// export default AppWithRouter;
export default App;
