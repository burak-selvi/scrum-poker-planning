import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory, ScrumMasterPanel } from '.';

export default function ScrumMasterView() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={5} >
        <StoryList />
      </Grid>
      <Grid item xs={3} className={classes.ml3}>
        <ActiveStory />
      </Grid>
      <Grid item xs={3} className={classes.ml5}>
        <ScrumMasterPanel />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  ml3: {
    marginLeft: theme.spacing(3),
  },
  ml5: {
    marginLeft: theme.spacing(5),
  }
}));