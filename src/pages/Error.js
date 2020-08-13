import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Error() {

  return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
    <Typography>
      Page Not Found
    </Typography>
    <Link to="/" style={{ textDecoration: 'none' }}>
      Go to homepage
</Link>
  </Box>
}
