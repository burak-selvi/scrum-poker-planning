import React from 'react'
import { CircularProgress, Box } from '@material-ui/core';

export default function LoaderProgress() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%">
      <CircularProgress />
    </Box>
  )
}
