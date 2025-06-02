import * as React from 'react';
import { Box, Pagination, Stack } from '@mui/material';

export default function PaginationComponent({ page, count, onChange }) {
  return (
    <Box display="flex" justifyContent="center" my={4}>
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          shape="rounded"
          color="primary"
          size="medium"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </Box>
  );
}
