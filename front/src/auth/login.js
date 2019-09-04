import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import Header from './header/header';
import Signup from './signUpForm/signUp';

class LoginComponent extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(({ data }) => {
        this.setState({
          users: data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid item
            xs={ 12 }>
        <Header />
        {/*{ this.state.users.map(user => <div key={ user._id }>{ user.firstName }</div>) }*/}
        <Signup />
      </Grid>
    )
  }
}

export default LoginComponent;
