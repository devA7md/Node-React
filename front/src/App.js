import React from 'react';
import { Grid } from '@material-ui/core';

import Login from './auth/login';
import Try from './auth/try';

import './App.css';

function App() {
  return (
    <Grid container>
      <Login />
      {/*<Try />*/}
    </Grid>
  );
}

export default App;
