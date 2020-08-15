import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Link, Box } from "@material-ui/core";
import { projectAuth } from './../firebaseConfig';
import Logo from './Logo';
import { setUser } from "../actions";
import { setLink } from './../actions';
import { getMasterId, getDeveloperLink } from "../utils";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const urlLink = useSelector(state => state.link);
  const { userId } = useSelector(state => state.user);
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

  return (
    <Container style={{ marginBottom: '5rem' }}>
      <Box display="flex" justifyContent="space-between" marginY="4rem">
        <Logo />
        {!!master && urlLink &&
          <Typography variant="body2">
            please share link of developers panel to the teammates: <Link href={urlLink} >{urlLink}
            </Link>
          </Typography>}
      </Box>
      {children}
    </Container>
  )
}
