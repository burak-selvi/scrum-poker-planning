import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory, ScrumMasterPanel, LoaderProgress } from '.';
import { useParams } from 'react-router-dom';
import { setSession } from '../redux/actions';
import { Link } from "react-router-dom";
import { useStories, useStatuses, useCurrentSession, useVotes } from './hooks';

export default function ScrumMasterView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sessionName } = useParams();
  const session = useSelector(state => state.sessionName);
  const { isMaster } = useSelector(state => state.user);
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

  return (
    <React.Fragment>
      {loading ? <LoaderProgress /> :
        isMaster ?
          <Grid container>
            <Grid item xs={12} md={5}>
              <StoryList statuses={statuses} stories={stories} />
            </Grid>
            {activeStory && <React.Fragment>
              <Grid item xs={12} sm={5} md={3} className={classes.ml3}>
                <ActiveStory
                  storyVotes={storyVotes}
                  votersNumber={currentSession.votersNumber}
                  currentVote={currentVote}
                  activeStory={activeStory} />
              </Grid>
              <Grid item xs={12} sm={5} md={3} className={classes.ml5}>
                <ScrumMasterPanel
                  stories={stories}
                  activeStory={activeStory}
                  storyVotes={storyVotes}
                  votersNumber={currentSession.votersNumber} />
              </Grid>
            </React.Fragment>}
          </Grid>
          : <React.Fragment>
            <p>You cannot see this page as a developer</p>
            <Link to={`/view-planning-as-developer/${sessionName}`} style={{ textDecoration: 'none' }}>
              Go to developer page
              </Link>
          </React.Fragment>
      }
    </React.Fragment>
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