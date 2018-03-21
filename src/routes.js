import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppWithRouter from './App.jsx';

const NYCETRouter = () => (
<main>
  <Switch> 
    <Route exact path="/" render={() => (
      <Redirect to='/AD/' />
        )} />
      <Route path='/AD/:AD?' component={AppWithRouter} />
  </Switch>
</main>
  )
  
export default NYCETRouter;
