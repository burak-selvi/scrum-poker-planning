import React from "react";
import Logo from './Logo';
import { Container, Typography, Link, Box } from "@material-ui/core";

export default function Layout({ children }) {
  const url = window.location.href;
  const pathName = window.location.pathname;

  return (
    <Container style={{ marginBottom: '5rem' }}>
      <Box display="flex" justifyContent="space-between" marginY="4rem">
        <Logo />
        {pathName.includes('scrum-master') &&
          <Typography variant="body2">
            please share link of developers panel to the teammates: <Link href={url} target="_blank">{url}
            </Link>
          </Typography>}
      </Box>
      {children}
    </Container>
  )
}
