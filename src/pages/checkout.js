import * as React from "react";
import { useAuth } from '../context/auth-context';
import AppBar from '../components/app-bar';
import Grid from "@mui/material/Grid"; 
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import { useCart } from '../context/cart-context';
import { useOrder } from '../context/order-context';
import { default as axios } from 'axios';
import { Helmet } from "react-helmet";

const CheckoutPage = () => {
  const { token, profileName } = useAuth()
  const { cartItems } = useCart()
  const { setOrderId } = useOrder()

  React.useEffect(() => {
    if (token === null) {
      navigate('https://accounts.besarts.biz.id/realms/besart/protocol/openid-connect/auth?client_id=besart-gallery&redirect_uri=https://besarts.biz.id/login-callback&response_type=code&scope=openid')
    }
  }, [])

  let totalPrice = 0
  cartItems.forEach(product => {
    totalPrice += product.price
  })

  const [shipping, setShipping] = React.useState({
    fullName: "",
    phoneNumber: "",
    fullAddress: "",
    notes: null
  })

  const handleShipping = (event) => {
    const { name, value } = event.target
    setShipping(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const checkoutHandler = () => {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      amount: 1
    }))

    const reqBody = {
      shipping: shipping,
      orderItems: orderItems
    }

    axios.post("https://api.besarts.biz.id/orders", reqBody, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then((response) => {
      setOrderId(response.data.id)

      navigate("/payment")
    })
  }

  return (
    <main style={{backgroundColor: '#f9f9f9'}}>
      <Helmet>
        <title>Checkout | BESArt Gallery</title>
      </Helmet>

      <AppBar userName={profileName} />
      <Box sx={{m: 4}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Checkout</Typography>
      </Box>

      <Grid container={true} spacing={2} sx={{m: 4}}>
        <Grid size={{md: 8, xs: 12}}>
          <Grid container={true} spacing={2} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            textAlign: 'center',
          }}>
            <Grid size={12}>
              <Typography variant="h6" align="left">Shipping Address</Typography>
            </Grid>
            <Grid size={{md: 6, xs: 12}}>
              <TextField
                required
                fullWidth
                name="fullName"
                onChange={handleShipping}
                label="Full Name"></TextField>
            </Grid>
            
            <Grid size={{md: 6, xs: 12}}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                onChange={handleShipping}
                label="Phone Number"></TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                name="fullAddress"
                onChange={handleShipping}
                label="Full Address"></TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                onChange={handleShipping}
                name="notes"
                label="Additional Notes"></TextField>
            </Grid>
          </Grid>

          <Grid container={true} spacing={2} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            textAlign: 'center',
            mt: 2,
          }}>
            <Grid size={12}>
              <Typography variant="h6" align="left">Order Detail</Typography>
            </Grid>
            {cartItems.map((product) => (
              <Grid size={12} key={product.id}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    padding: 2,
                  }}
                  gap={2}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 128,
                      height: 128,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />

                  {/* Middle: Info */}
                  <Box flex={1} sx={{
                    textAlign: 'left',              
                  }}>
                    <Typography variant="body1">
                      {product.name}
                    </Typography>
                  </Box>

                  {/* Right: Quantity & Price */}
                  <Box whiteSpace="nowrap" sx={{
                    display: {
                      xs: 'none', // hide on xs
                      sm: 'block', // show on sm and up
                    }}}>
                    <Typography variant="body1">
                      1 x IDR {new Intl.NumberFormat("id").format(product.price)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{md: 4, xs: 12}} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            height: 'fit-content'
          }}>
          <Box display="flex" sx={{
            justifyContent: "space-between"
          }}>
            <Typography color="text.secondary" variant="body1" sx={{textAlign: "left"}}>Subtotal</Typography>
            <Typography color="text.primary" variant="body1" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(totalPrice)}</Typography>
          </Box>

          <Box display="flex" sx={{
            justifyContent: "space-between",
            mt: 2
          }}>
            <Typography color="text.secondary" variant="body1" sx={{textAlign: "left"}}>Shipping</Typography>
            <Typography color="text.primary" variant="body1" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(0)}</Typography>
          </Box>

          <Box display="flex" sx={{
            justifyContent: "space-between",
            mt: 2
          }}>
            <Typography color="text.secondary" variant="body1" sx={{textAlign: "left"}}>Tax</Typography>
            <Typography color="text.primary" variant="body1" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(0)}</Typography>
          </Box>

          <Divider sx={{mt: 2}} />
          
          <Box display="flex" sx={{
            justifyContent: "space-between",
            mt: 2
          }}>
            <Typography color="text.primary" variant="h6" sx={{textAlign: "left"}}>Total</Typography>
            <Typography color="text.primary" variant="h6" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(totalPrice)}</Typography>
          </Box>

          <Button fullWidth variant="contained" color="primary" sx={{mt: 4}} onClick={checkoutHandler}>Pay Now</Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 2,
          backgroundColor: '#ffffff'
        }}
        >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} By BESArt Gallery. All rights reserved.
        </Typography>
      </Box>
    </main>
  )
}

export default CheckoutPage

export const Head = () => {
  return (
    <>
      <title>Checkout | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}