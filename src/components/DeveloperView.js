import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import { StoryList, ActiveStory } from '.';
import { projectAuth, projectFirestore } from './../firebaseConfig';
import { useParams } from 'react-router-dom';

export default function DeveloperView() {
  const classes = useStyles();
  const { sessionName } = useParams();
  const [currentStory, setCurrentStory] = useState();
  const [userId, setUserId] = useState('');
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState({});
  const [statuses, setStatuses] = useState([]);
  console.log('Session Name', sessionName)
  // console.log(userId)
  console.log('Active Story', activeStory)

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      projectAuth.signInAnonymously();
      projectAuth.onAuthStateChanged(firebaseUser => {
        setUserId(firebaseUser?.uid)
      });
    }
    return () => {
      isMounted = false;
      // projectAuth.signOut();
    }
  }, []);

  useEffect(() => {
    projectFirestore.collection(`sessions/${sessionName}/stories`).orderBy('position').onSnapshot(collection => {
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
    projectFirestore.collection(`sessions`).where('name', '==', sessionName).onSnapshot(collection => {
      const data = collection.docs.map(doc => {
        return {
          ...doc.data()
        }
      });
      // console.log(data)
    })
  }, [sessionName]);

  // const handleClick = () => {
  //   projectFirestore.doc(`sessions/${sessionName}/stories/story1/votes/${userId}`).set({
  //     name: `voter-${userId}`,
  //     point: 90
  //   })
  // };

  return (
    <Grid container>
      <Grid item xs={7} >
        <StoryList statuses={statuses} stories={stories} currentStory={currentStory} setCurrentStory={setCurrentStory} />
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