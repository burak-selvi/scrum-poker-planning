import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Typography, Link, Box } from "@material-ui/core";
import Logo from './Logo';

function Layout({ children }) {
  const urlLink = useSelector(state => state.link);
  const pathName = window.location.pathname;

  return (
    <Container style={{ marginBottom: '5rem' }}>
      <Box display="flex" justifyContent="space-between" marginY="4rem">
        <Logo />
        {pathName.includes('scrum-master') && urlLink &&
          <Typography variant="body2">
            please share link of developers panel to the teammates: <Link href={urlLink} >{urlLink}
            </Link>
          </Typography>}
      </Box>
      {children}
    </Container>
  )
}
export default withRouter(Layout);
