import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory, LoaderProgress } from '.';
import { useParams } from 'react-router-dom';
import { setSession } from '../redux/actions';
import { useStories, useStatuses, useCurrentSession, useVotes } from './hooks';

export default function DeveloperView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sessionName } = useParams();
  const session = useSelector(state => state.sessionName)
  const { userId } = useSelector(state => state.user);
  const activeStory = useSelector(state => state.activeStory);
  const { stories, loading } = useStories(session);
  const { statuses } = useStatuses();
  const { currentSession } = useCurrentSession();
  const { storyVotes, currentVote } = useVotes();

  useEffect(() => {
    if (!session) {
      dispatch(setSession(sessionName))
    }
  }, [session, sessionName, dispatch]);

  const checkVotes = () => {
    let check = false;
    const isUserVoted = storyVotes.some(vote => vote.id === userId);
    const isMasterVoted = storyVotes.some(vote => vote.isMaster);
    if (isMasterVoted) {
      check = isUserVoted || storyVotes.length < currentSession.votersNumber;
    } else {
      check = isUserVoted || storyVotes.length < currentSession.votersNumber - 1;
    }
    return check;
  }

  return (
    <React.Fragment>
      {loading ? <LoaderProgress /> :
        currentSession && checkVotes() ?
          <Grid container>
            <Grid item xs={7} >
              <StoryList statuses={statuses} stories={stories} />
            </Grid>
            {activeStory && !activeStory.isLast && <Grid item xs={4} className={classes.ml5}>
              <ActiveStory
                storyVotes={storyVotes}
                votersNumber={currentSession.votersNumber}
                currentVote={currentVote}
                activeStory={activeStory} />
            </Grid>}
          </Grid> : <p>No Voting</p>
      }
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  ml5: {
    marginLeft: theme.spacing(5),
  }
}));