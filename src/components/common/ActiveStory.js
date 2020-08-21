import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Grid, Container, makeStyles, Typography, Box, useMediaQuery } from '@material-ui/core';
import { projectFirestore } from '../../firebaseConfig';
import { initialVotes } from '../../constants';

export default function ActiveStory({ activeStory, currentVote, storyVotes, votersNumber }) {
  const xsScreen = useMediaQuery('(max-width: 599px)');
  const classes = useStyles();
  const sessionName = useSelector(state => state.sessionName);
  const { userId, isMaster } = useSelector(state => state.user);
  const [voted, setVoted] = useState(currentVote);
  const leftVote = votersNumber - (storyVotes?.length - 1);

  useEffect(() => {
    const vote = storyVotes.find(vote => vote.id === userId);
    if (vote) {
      setVoted(vote.point);
    } else {
      setVoted('');
    }
  }, [storyVotes, userId]);

  const handleVote = value => {
    setVoted(value);
    let finalPosition, isLastVote, votesLength = storyVotes?.length;
    const currentlyVoting = storyVotes.find(vote => vote.id === userId);
    if (currentlyVoting) {
      finalPosition = currentlyVoting.position;
      isLastVote = currentlyVoting.isLastVote;
    } else {
      isLastVote = leftVote === 1;
      const isMasterVoted = storyVotes.some(vote => vote.isMaster);
      if (!isMasterVoted) {
        votesLength++;
      }
      finalPosition = isMaster ? votersNumber + 1 : votesLength;
    }
    projectFirestore.doc(`sessions/${sessionName}/stories/${activeStory.name}/votes/${userId}`).set({
      name: userId,
      point: value,
      isLastVote,
      position: finalPosition,
      isMaster
    });
  }

  return (
    <React.Fragment>
      <p>Active Story</p>
      <Container className={classes.container} style={{ height: xsScreen ? 'auto' : '100%' }}>
        <Box width="100%" marginBottom="1rem">
          <Typography>
            {activeStory?.name}
          </Typography>
        </Box>
        <Grid container>
          {initialVotes.map(vote => {
            return (
              <Grid key={vote} item xs={4} lg={3} className={classes.voteWrapper} >
                <div className={classes.voteBox} style={{ border: voted === vote ? '2px solid green' : '2px solid black' }} onClick={() => handleVote(vote)}>
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
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteWrapper: {
    textAlign: 'center',
    padding: '1rem'
  },
  voteBox: {
    border: '1px solid black',
    paddingTop: '7px',
    paddingBottom: '7px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  totalVote: {
    textAlign: 'center',
    marginTop: '1rem'
  }
}));
