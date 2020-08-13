import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory } from '.';

export default function DeveloperView() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={7} >
        <StoryList />
      </Grid>
      <Grid item xs={4} className={classes.ml5}>
        <ActiveStory />
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  ml5: {
    marginLeft: theme.spacing(5),
  }
}));