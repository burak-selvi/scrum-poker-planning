import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, makeStyles, Typography, Button, Box } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { setLink, setUser, setAlert } from '../redux/actions';
import { projectFirestore } from './../firebaseConfig';
import { useAllSessions } from './hooks';

export default function StoryListForm({ history }) {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const { allSessions } = useAllSessions();

  const onSubmit = data => {
    const sameSession = allSessions.find(s => s.name === data.sessionName);
    if (sameSession) {
      dispatch(setAlert({ isOpen: true, message: 'Please choose different name', alertType: 'error' }));
    } else {
      const finalData = { ...data, votersNumber: parseInt(data.votersNumber), storyList: data.storyList.split('\n').filter(list => list) };
      projectFirestore.doc(`sessions/${finalData.sessionName}`).set({
        name: finalData.sessionName,
        votersNumber: finalData.votersNumber
      });
      finalData.storyList.forEach((storyName, index) => {
        projectFirestore.doc(`sessions/${finalData.sessionName}/stories/${storyName}`).set({
          name: storyName,
          point: 0,
          status: index === 0 ? 2 : 0,
          position: index + 1
        });
      });
      const developerUrl = `${window.location.origin}/#/view-planning-as-developer/${finalData.sessionName}`;
      localStorage.setItem('link', developerUrl);
      localStorage.setItem('master', userId);
      dispatch(setLink(developerUrl));
      dispatch(setUser({ userId, isMaster: true }));
      dispatch(setAlert({ isOpen: true, message: 'Oturum oluşturuldu', alertType: 'success' }));
      history.push(`/view-planning-as-scrum-master/${finalData.sessionName}`);
    }
  }

  const numberControl = e => {
    if (e.target.value !== '0') {
      return Math.max(1, parseInt(e.target.value));
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container >
          <Grid item xs={6} className={classes.pr2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Session Name"
              name="sessionName"
              error={Boolean(errors.sessionName)}
              inputRef={register({ required: true })}
              inputProps={{ maxLength: 200 }} />
            {errors.sessionName && <Typography variant="caption" color="error">This field cannot be empty</Typography>}
          </Grid>
          <Grid item xs={6} className={classes.pl2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Number of voters"
              name="votersNumber"
              error={Boolean(errors.votersNumber)}
              inputRef={register({ required: true })}
              onInput={(e) => (e.target.value = numberControl(e))}
              type="number" />
            {errors.votersNumber && <Typography variant="caption" color="error">This field cannot be empty</Typography>}
          </Grid>
          <Grid item xs={12} className={classes.mt3}>
            <Typography variant="body1" className={classes.mt3}>
              Paste your story list below (Each line will be converted as a story)
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.mt3}>
            <TextField
              fullWidth
              variant="outlined"
              name="storyList"
              multiline
              error={Boolean(errors.storyList)}
              rows={10}
              inputRef={register({ required: true })} />
            {errors.storyList && <Typography variant="caption" color="error">This field cannot be empty</Typography>}
          </Grid>
          <Box className={classes.buttonContainer} width="100%">
            <Grid item xs={4} >
              <Button type="submit" fullWidth variant="outlined" className={classes.button}>
                Start Session
              </Button>
            </Grid>
          </Box>
        </Grid>
      </form>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  pl2: {
    paddingLeft: theme.spacing(2),
  },
  pr2: {
    paddingRight: theme.spacing(2),
  },
  mt3: {
    marginTop: theme.spacing(3)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3)
  },
  button: {
    height: '60px'
  }
}));