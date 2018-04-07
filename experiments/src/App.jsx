import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ExperimentsContainer from './components/ExperimentsContainer.jsx'
import './App.css';

// const d3 = require('d3');
//
// const axios = require('axios');
// axios({
//   method:'get',
//   url:'http://localhost:8080/',
// })
//   .then(function(response) {
//     console.log(response)
// });


class App extends Component {
  constructor(props){
    super(props)
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
