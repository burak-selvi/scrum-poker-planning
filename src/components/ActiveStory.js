import React from 'react'
import { Grid, Container, makeStyles } from '@material-ui/core';

export default function ActiveStory() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <p>Active Story</p>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              1
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              2
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              3
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              4
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              5
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              6
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              7
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              8
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              9
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              10
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              11
            </div>
          </Grid>
          <Grid item xs={3} className={classes.voteWrapper}>
            <div className={classes.voteBox}>
              12
            </div>
          </Grid>
          <Grid item xs={12} className={classes.totalVote}>
            134 Voted
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  voteWrapper: {
    textAlign: 'center',
    padding: '1rem'
  },
  voteBox: {
    border: '1px solid black',
    paddingTop: '7px',
    paddingBottom: '7px'
  },
  totalVote: {
    textAlign: 'center',
    marginTop: '1rem'
  }
}));