import React from 'react';
import { Route } from 'react-router-dom';
import App from './App'

export default (
  <Route path="/" component={App} />
);

// const NYCETRouter = () => (
// <main>
//   <Switch> 
//     <Route exact path="/" render={() => (
//       <Redirect to='/AD/' />
//         )} />
//       <Route path='/AD/:AD?' component={AppWithRouter} />
//   </Switch>
// </main>
//   )
  
