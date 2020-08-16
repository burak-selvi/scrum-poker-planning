import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory, LoaderProgress } from '.';
import { projectFirestore } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { setSession } from '../redux/actions';

export default function DeveloperView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { sessionName } = useParams();
  const session = useSelector(state => state.sessionName)
  const { userId } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [currentStory, setCurrentStory] = useState({});
  const [currentSession, setCurrentSession] = useState(null);
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
    setLoading(true);
    if (session) {
      projectFirestore.collection(`sessions/${session}/stories`).orderBy('position').onSnapshot(collection => {
        setLoading(false);
        const data = collection.docs.map(doc => {
          if (doc.data().status === 2) {
            setActiveStory(doc.data());
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
      projectFirestore.collection(`sessions/${session}/stories/${activeStory.name}/votes`).onSnapshot(collection => {
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
              <StoryList statuses={statuses} stories={stories} currentStory={currentStory} setCurrentStory={setCurrentStory} />
            </Grid>
            {activeStory && <Grid item xs={4} className={classes.ml5}>
              <ActiveStory storyVotes={storyVotes} votersNumber={currentSession.votersNumber} currentVote={currentVote} activeStory={activeStory} />
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