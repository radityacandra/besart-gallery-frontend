import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/cart-context';
import { navigate } from 'gatsby';

export default function CartDrawer({ open, onClose }) {
  const { cartItems } = useCart();

  let totalCost = 0
  cartItems.forEach(item => {
    totalCost = totalCost + parseInt(item.price)
  });

  let buttonDisabled = false
  if (totalCost === 0) {
    buttonDisabled = true
  }

  const CartItem = ({ name, price, image }) => (
    <Box display="flex" alignItems="center" gap={2}>
      <Box
        width={64}
        height={64}
        component={"img"}
        src={image}
        alt={name}
        borderRadius={2}
        sx={{
          objectFit: 'contain',
        }}
      />
      <Box flexGrow={1}>
        <Typography fontSize={14} fontWeight={500}>{name}</Typography>
        <Typography fontSize={12} color="text.secondary">IDR {new Intl.NumberFormat("id").format(price)} × 1</Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" color="warning"><AddIcon fontSize="inherit" /></IconButton>
        <Typography fontSize={14}>1</Typography>
        <IconButton size="small" color="warning"><RemoveIcon fontSize="inherit" /></IconButton>
      </Stack>
    </Box>
  );

  return (
    <>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        onClick={onClose}
      />

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 360,
            p: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">🛒 {cartItems.length} item</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={2} sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cartItems.map((item, idx) => (
            <CartItem key={idx} {...item} />
          ))}
        </Stack>

        <Box sx={{
          borderTop: '1px solid #eee',
          p: 2,
          position: 'sticky', // optional, works fine with or without
          bottom: 0,
          mb: 4,
        }}>
          <Button fullWidth variant="contained" color="warning" disabled={buttonDisabled} onClick={() => { navigate("/checkout") }}>
            Checkout Now (IDR {new Intl.NumberFormat("id").format(totalCost)})
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
