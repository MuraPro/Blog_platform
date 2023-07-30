import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

function Spinner() {
  return (
    <Stack alignItems="center" sx={{ display: 'flex' }}>
      <CircularProgress />
    </Stack>
  );
}

export default Spinner;
