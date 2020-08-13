import React from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core';

export default function ScrumMasterPanel() {
  return (
    <React.Fragment>
      <p>Scrum Master Panel</p>
      <Box border='1px solid black' height='100%'>
        <Box padding="1rem">
          <Typography variant="body2">
            Story 1 is Active
        </Typography>
          <Typography variant="body2">
            Voter 1 : 13
        </Typography>
          <Typography variant="body2">
            Voter 1 : 13
        </Typography>
          <Typography variant="body2">
            Voter 1 : 13
        </Typography>
          <Typography variant="body2">
            Voter 1 : 13
        </Typography>
          <Typography variant="body2">
            Scrum Master : 15
        </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop="3rem" paddingLeft="2rem" paddingRight="2rem">
          <Typography variant="caption">
            Seems teams has different votes
        </Typography>
          <Typography variant="caption" style={{ textAlign: 'center' }}>
            Please discuss and finalize the score below textbox
        </Typography>
          <TextField variant="outlined" label="Final Score" style={{ marginTop: '1rem' }} />
          <Button variant="outlined" style={{ marginTop: '1rem' }}>
            End Voting For Story 1
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}
