import * as React from 'react';
import { Box, Typography, Rating, CardActionArea } from '@mui/material';

const SeamlessProductCard = (props) => {
  const { image, name, price, oldPrice, rating, onClick } = props;

  return (
    <CardActionArea
      onClick={onClick}
      sx={{
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
          },
      }}>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: '16px',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'contain',
            borderRadius: '8px',
            mb: 2,
          }}
        />
        <Rating value={rating} precision={0.5} readOnly size="small" />
        <Typography variant="subtitle1" fontWeight={500} mt={1}>
          {name}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={0.5}>
          <Typography variant="subtitle1" color="primary">
            ${price.toFixed(2)}
          </Typography>
          {oldPrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#999' }}>
              ${oldPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </CardActionArea>
  );
};

export default SeamlessProductCard;
