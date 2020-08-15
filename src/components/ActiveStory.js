import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Container, makeStyles, Typography, Box } from '@material-ui/core';
import { projectFirestore } from '../firebaseConfig';

export default function ActiveStory({ activeStory, currentVote, storyVotes, votersNumber }) {
  const classes = useStyles();
  const sessionName = useSelector(state => state.sessionName);
  const { userId, isMaster } = useSelector(state => state.user);
  const initialVotes = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, '?'];
  const [voted, setVoted] = useState(currentVote);
  const leftVote = votersNumber - storyVotes?.length;
  useEffect(() => {
    if (currentVote) {
      setVoted(currentVote);
    }
  }, [currentVote]);

  console.log('storyVotes', storyVotes)

  const handleVote = value => {
    setVoted(value);
    let finalPosition;
    const currentlyVoting = storyVotes.find(vote => vote.id === userId);
    console.log(currentlyVoting)
    if (currentlyVoting) {
      finalPosition = currentlyVoting.position;
    } else {
      finalPosition = isMaster ? votersNumber : storyVotes?.length + 1;
    }
    projectFirestore.doc(`sessions/${sessionName}/stories/${activeStory.name}/votes/${userId}`).set({
      name: userId,
      point: value,
      isLastVote: leftVote === 1,
      position: finalPosition,
      isMaster
    });
  }

  return (
    <React.Fragment>
      <p>Active Story</p>
      <Container className={classes.container}>
        <Box width="100%" marginTop="-1rem" marginBottom="1rem">
          <Typography>
            {activeStory?.name}
          </Typography>
        </Box>
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
    flexDirection: 'column',
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