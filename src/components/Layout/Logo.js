import React, { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogActions, makeStyles, Popover, Typography } from '@material-ui/core';
import { removeStorages } from '../../utils';

export default function Logo() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isPopoverOpen = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const handleClick = () => {
    setOpen(true);
  }

  const clearSession = () => {
    setOpen(false);
    removeStorages();
    window.location.replace('/');
  }

  const closeDialog = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        handleClose={closeDialog}>
        <DialogContent>
          Do you want to clear the session?
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={clearSession}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box
        textAlign="center"
        width="200px"
        border="4px solid #19D4E9"
        fontSize="56px"
        paddingY="1rem"
        className={classes.logo}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}>
        Scrum Poker
    </Box>
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Click for the clear session</Typography>
      </Popover>
    </React.Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  logo: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));