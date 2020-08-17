import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Link, Box, Button, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { projectAuth } from '../../firebaseConfig';
import Logo from './Logo';
import { setUser, setLink, setAlert } from "../../redux/actions";
import { getMasterId, getDeveloperLink } from "../../utils";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const urlLink = useSelector(state => state.link);
  const { userId } = useSelector(state => state.user);
  const { open, message } = useSelector(state => state.alert);
  const link = getDeveloperLink();
  const master = getMasterId();

  useEffect(() => {
    projectAuth.signInAnonymously();
    projectAuth.onAuthStateChanged(firebaseUser => {
      let isMaster;
      if (!userId) {
        if (master === firebaseUser?.uid) {
          isMaster = true;
        } else {
          isMaster = false;
        }
        dispatch(setUser({ userId: firebaseUser?.uid, isMaster }));
      }
    });
  }, [userId, master, dispatch]);

  useEffect(() => {
    if (!urlLink) {
      dispatch(setLink(link));
    }
  }, [urlLink, link, dispatch]);

  const copyClipboard = () => {
    dispatch(setAlert({ isOpen: true, message: 'Copied to clipboard' }));
    navigator.clipboard.writeText(urlLink);
  }

  const handleClose = () => {
    dispatch(setAlert({ isOpen: false, message: '' }));
  }

  return (
    <Container style={{ marginBottom: '5rem' }}>
      <Box display="flex" justifyContent="space-between" marginY="4rem">
        <Logo />
        {!!master && urlLink &&
          <Box>
            <Typography variant="body2" style={{ textAlign: 'end' }}>
              please share link of developers panel to the teammates: <Link href={urlLink} >{urlLink}
              </Link>
            </Typography>
            <Button onClick={copyClipboard} style={{ marginTop: '1rem' }} color="primary" variant="outlined">
              Copy to clipboard
            </Button>
          </Box>}
      </Box>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">
          {message}
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}
