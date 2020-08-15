import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory, ScrumMasterPanel } from '.';
import { useParams } from 'react-router-dom';
import { projectFirestore } from './../firebaseConfig';
import { setSession } from '../actions';

export default function ScrumMasterView() {
  const dispatch = useDispatch();
  const { sessionName } = useParams();
  const classes = useStyles();
  const session = useSelector(state => state.sessionName)
  const { userId } = useSelector(state => state.user);
  const [currentSession, setCurrentSession] = useState({});
  const [currentVote, setCurrentVote] = useState('');
  const [stories, setStories] = useState([]);
  const [storyVotes, setStoryVotes] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    if (!session) {
      dispatch(setSession(sessionName))
    }
  }, [session, sessionName, dispatch]);

  useEffect(() => {
    if (session) {
      projectFirestore.collection(`sessions/${session}/stories`).orderBy('position').onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          if (doc.data().status === 2) {
            setActiveStory({ ...doc.data(), id: doc.id });
          }
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        setStories([...data]);
      });
      projectFirestore.collection(`statuses`).onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        setStatuses([...data]);
      });
      projectFirestore.collection(`sessions`).where('name', '==', session).onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          return {
            ...doc.data()
          }
        });
        setCurrentSession(data[0]);
      })
    }

  }, [session]);

  useEffect(() => {
    if (activeStory?.name) {
      projectFirestore.collection(`sessions/${session}/stories/${activeStory.name}/votes`).orderBy('position').onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          if (doc.id === userId) {
            setCurrentVote(doc.data().point);
          }
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        setStoryVotes([...data]);
      });
    }
  }, [activeStory, session, userId]);

  return (
    <Grid container>
      <Grid item xs={5} >
        <StoryList statuses={statuses} stories={stories} />
      </Grid>
      {activeStory && <React.Fragment>
        <Grid item xs={3} className={classes.ml3}>
          <ActiveStory storyVotes={storyVotes} votersNumber={currentSession.votersNumber} currentVote={currentVote} activeStory={activeStory} />
        </Grid>
        <Grid item xs={3} className={classes.ml5}>
          <ScrumMasterPanel stories={stories} activeStory={activeStory} storyVotes={storyVotes} votersNumber={currentSession.votersNumber} />
        </Grid>
      </React.Fragment>}
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