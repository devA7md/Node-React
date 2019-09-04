import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pap: {
    boxShadow: '0px 1px 5px 1px #9E9E9E',
    height: 50
  }
}));

const HeaderComponent = () => {
  const styles = useStyles();

  return (
    <Grid container
          className={ styles.pap }
          spacing={ 0 }>
      <Grid xs
            item>
        Logo
      </Grid>
    </Grid>
  )
};

export default HeaderComponent;
