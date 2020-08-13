import React, { useState } from 'react'
import { Grid, TextField, makeStyles, Typography, Button, Box } from '@material-ui/core';

export default function StoryListForm() {
  const classes = useStyles();
  const [value, setValue] = useState("");

  console.log(value.split('\n'));

  const handleValueChange = event => {
    setValue(event.target.value);
  }

  const numberControl = e => {
    if (e.target.value !== '0') {
      return Math.max(1, parseInt(e.target.value));
    }
  };

  return (
    <React.Fragment>
      <Grid container >
        <Grid item xs={6} className={classes.pr2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Session Name"
            inputProps={{ maxLength: 200 }} />
        </Grid>
        <Grid item xs={6} className={classes.pl2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Number of voters"
            onInput={(e) => (e.target.value = numberControl(e))}
            type="number" />
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
            multiline
            rows={10}
            onChange={handleValueChange} />
        </Grid>
        <Box className={classes.buttonContainer} width="100%">
          <Grid item xs={4} >
            <Button fullWidth variant="outlined" className={classes.button}>
              Start Session
          </Button>
          </Grid>
        </Box>
      </Grid>
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
