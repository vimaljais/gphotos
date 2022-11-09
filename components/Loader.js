import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Stack sx={{ color: 'grey.500', height: '80vh',display: 'flex', alignItems: 'center' }} spacing={2} direction="row">
      <CircularProgress size={60} color="secondary" />
    </Stack>
  );
}