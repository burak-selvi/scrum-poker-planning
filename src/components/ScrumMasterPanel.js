import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { projectFirestore } from '../firebaseConfig';

export default function ScrumMasterPanel({ storyVotes, votersNumber, activeStory, stories }) {
  const sessionName = useSelector(state => state.sessionName);
  const [finalScore, setFinalScore] = useState('');
  const classes = useStyles();
  let isAllVoted = false;

  const createVoters = (count) => {
    let arr = [];
    for (let index = 0; index < count - 1; index++) {
      let finalPoint = 'Not Voted';
      let point = storyVotes.find(voter => voter.position === index + 1)?.point;
      isAllVoted = storyVotes.some(voter => voter.isLastVote);
      if (point) {
        if (isAllVoted) {
          finalPoint = point;
        } else {
          finalPoint = 'Voted'
        }
      }
      arr[index] = { name: `Voter ${index + 1} : `, position: index + 1, point: finalPoint };
    }
    const point = storyVotes.find(voter => voter.position === count)?.point;
    let finalPoint = 'Not Voted';
    if (point) {
      if (isAllVoted) {
        finalPoint = point;
      } else {
        finalPoint = 'Voted';
      }
    }
    arr[count - 1] = { name: `Scrum Master : `, position: count, point: finalPoint };
    return arr;
  }

  const handleFinalScoreChange = event => {
    setFinalScore(parseInt(event.target.value));
  }

  const handleEndVoting = () => {
    const nextStory = stories.find(story => story.position === activeStory.position + 1);
    projectFirestore.doc(`sessions/${sessionName}/stories/${activeStory.id}`).update({
      point: finalScore,
      status: 1
    });
    if (nextStory) {
      projectFirestore.doc(`sessions/${sessionName}/stories/${nextStory.id}`).update({
        point: 0,
        status: 2
      });
    }
    setFinalScore('');
  }

  return (
    <React.Fragment>
      <p>Scrum Master Panel</p>
      <Box border='1px solid black' height='100%'>
        <Box padding="1rem">
          <Typography variant="body2" className={classes.mb3}>
            {activeStory?.name} is Active
          </Typography>
          {createVoters(votersNumber).map(voter => {
            return (
              <Typography key={voter.name} variant="body2">
                {voter.name} {voter.point}
              </Typography>
            )
          })}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop="3rem" paddingLeft="2rem" paddingRight="2rem">
          {isAllVoted && <React.Fragment>
            <Typography variant="caption">
              Seems teams has different votes
        </Typography>
            <Typography variant="caption" style={{ textAlign: 'center' }}>
              Please discuss and finalize the score below textbox
        </Typography>
          </React.Fragment>}
          <TextField
            value={finalScore}
            onChange={handleFinalScoreChange}
            variant="outlined"
            label="Final Score"
            style={{ marginTop: '1rem' }} />
          <Button
            onClick={handleEndVoting}
            variant="outlined"
            style={{ marginTop: '1rem' }}
            disabled={!isAllVoted}>
            End Voting For Story 1
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  mb3: {
    marginBottom: theme.spacing(3),
  }
}));