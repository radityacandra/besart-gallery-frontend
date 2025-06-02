import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { navigate } from 'gatsby';

export default function Banner(props) {
  const { image, height, title } = props;

  function goToProducts() {
    navigate('/products')
  }

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: height,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0)',
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          maxWidth: 400,
        }}
      >
        <Typography variant="h3" fontWeight="medium" color="text.primary">
          {title}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1}>
          COLLECTION
        </Typography>
        <Typography variant="body1" mb={2}>
          Start from <strong>$40.45</strong>
        </Typography>
        <Button variant="contained" color="warning" size="large" onClick={goToProducts}>
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};