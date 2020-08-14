import React, { useState } from 'react'
import { Grid, Container, makeStyles } from '@material-ui/core';

export default function ActiveStory() {
  const classes = useStyles();
  const initialVotes = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, '?'];
  const [voted, setVoted] = useState('');

  const handleVote = value => {
    setVoted(value);
  }

  return (
    <React.Fragment>
      <p>Active Story</p>
      <Container className={classes.container}>
        <Grid container>
          {initialVotes.map(vote => {
            return (
              <Grid key={vote} item xs={3} className={classes.voteWrapper}>
                <div className={classes.voteBox} onClick={() => handleVote(vote)}>
                  {vote}
                </div>
              </Grid>
            )
          })}
          <Grid item xs={12} className={classes.totalVote}>
            {voted ? `${voted} voted` : 'Please Vote!!'}
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