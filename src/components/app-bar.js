import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { navigate } from 'gatsby';
import { useCart } from '../context/cart-context';

export default function ButtonAppBar(props) {
  const { userName, cartOnClick } = props
  let loginText = "LOGIN"
  if (userName != null) {
    loginText = userName
  }

  const { cartItems } = useCart();
  let cartLength = 0
  if (cartItems != null && cartItems.length > 0) {
    cartLength = cartItems.length
  }

  function goToHome() {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color='inherit' sx={{ flexGrow: 1, justifyContent: 'left' }} onClick={goToHome}>
            <LandscapeIcon />
            <Typography variant="h6" component="div" sx={{ml: 1}}>
              BESArt Gallery
            </Typography>
          </Button>

          <Button color="inherit" href="http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&redirect_uri=http://localhost:8000/login-callback&response_type=code&scope=openid">{loginText}</Button>
          
          <Button color='inherit' onClick={cartOnClick}>
            <Typography variant="button" sx={{ flexGrow: 1 }}>
              CART &nbsp;
            </Typography>
            <Badge badgeContent={cartLength} color="primary">
              <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}