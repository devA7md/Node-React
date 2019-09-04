import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  makeStyles
} from '@material-ui/core';

const initialValues = {
  firstName: null,
  lastName: null,
  password: null,
  email: null,
  username: null,
  gender: 'male',
};

const useStyles = makeStyles(theme => ({
    grid_container: {
      padding: theme.spacing(2)
    },
    text_field: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  })
);

const userSchema = Yup.object()
  .shape({
    firstName: Yup.string().nullable().min(4, 'Too Short!').max(16, 'Too Long!').required('First name is required'),
    lastName: Yup.string().nullable().min(4, 'Too Short!').max(16, 'Too Long!').required('Last name is required'),
    email: Yup.string().nullable().email().required('Email is required'),
    username: Yup.string().nullable().min(6, 'Too Short!').max(16, 'Too Long!').required('Username is required'),
    password: Yup.string().nullable().min(6, 'Too Short!').max(16, 'Too Long!').required('Password is required')
  });

const onSubmit = (values, { setSubmitting, resetForm }) => {
  console.log(values);
  axios.post('http://localhost:5000/users', values)
    .then(() => {
      setSubmitting(false);
      resetForm(initialValues);
    })
    .catch(err => console.log(err))
};

export default () => {
  const styles = useStyles();

  return (
    <Formik initialValues={ initialValues }
            validationSchema={ userSchema }
            onSubmit={ onSubmit }>
      {
        all => {
          return (
            <Grid container
                  justify="space-around"
                  className={ styles.grid_container }>
              <Grid item
                    xs={ 12 }
                    sm={ 4 }>
                <h3>Sign Up Now</h3>
              </Grid>

              <Grid item
                    xs={ 12 }
                    sm={ 4 }>
                <Grid container>
                  <Grid item
                        className={ styles.text_field }
                        xs>
                    <TextField
                      fullWidth
                      name="firstName"
                      type="text"
                      onChange={ all.handleChange }
                      onBlur={ all.handleBlur }
                      label="First Name"
                      error={ all.errors.firstName && all.touched.firstName }
                      helperText={ all.errors.firstName && all.touched.firstName ? all.errors.firstName : '' }
                      margin="normal" />
                  </Grid>

                  <Grid item
                        className={ styles.text_field }
                        xs>
                    <TextField
                      fullWidth
                      name="lastName"
                      type="text"
                      onChange={ all.handleChange }
                      onBlur={ all.handleBlur }
                      label="Last Name"
                      error={ all.errors.lastName && all.touched.lastName }
                      helperText={ all.errors.lastName && all.touched.lastName ? all.errors.lastName : '' }
                      margin="normal" />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item
                        className={ styles.text_field }
                        xs={ 12 }>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      onChange={ all.handleChange }
                      onBlur={ all.handleBlur }
                      label="Email"
                      placeholder="Ex. name@website.com"
                      error={ all.errors.email && all.touched.email }
                      helperText={ all.errors.email && all.touched.email ? all.errors.email : '' }
                      margin="normal" />
                  </Grid>
                  <Grid item
                        className={ styles.text_field }
                        xs={ 12 }>
                    <TextField
                      fullWidth
                      name="username"
                      type="text"
                      onChange={ all.handleChange }
                      onBlur={ all.handleBlur }
                      label="Username"
                      error={ all.errors.username && all.touched.username }
                      helperText={ all.errors.username && all.touched.username ? all.errors.username : '' }
                      margin="normal" />
                  </Grid>
                  <Grid item
                        className={ styles.text_field }
                        xs={ 12 }>
                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      onChange={ all.handleChange }
                      onBlur={ all.handleBlur }
                      label="Password"
                      error={ all.errors.password && all.touched.password }
                      helperText={ all.errors.password && all.touched.password ? all.errors.password : '' }
                      margin="normal" />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item
                        className={ styles.text_field }
                        xs={ 12 }>
                    <RadioGroup name="gender"
                                value={ all.values.gender }
                                onChange={ all.handleChange }>
                      <FormControlLabel control={ <Radio color={ 'primary' } /> }
                                        value="male"
                                        label="Male" />
                      <FormControlLabel control={ <Radio color={ 'primary' } /> }
                                        value="female"
                                        label="Female" />
                    </RadioGroup>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item
                        className={ styles.text_field }
                        xs={ 12 }>
                    <Button onClick={ all.handleSubmit }
                            color="primary"
                            variant="contained"
                            disabled={ !all.isValid }>
                      Go
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      }
    </Formik>
  )
}
