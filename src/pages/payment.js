import * as React from 'react'
import { useAuth } from '../context/auth-context';
import AppBar from '../components/app-bar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import { useCart } from '../context/cart-context';
import { useOrder } from '../context/order-context';
import { default as axios } from 'axios';

const PaymentPage = () => {
  const { token, profileName } = useAuth();
  const { cartItems, clearCartItems } = useCart();
  const { orderId } = useOrder();
  const totalPrice = React.useMemo(() => {
    let totalPrice = 0

    cartItems.forEach(product => {
      totalPrice += product.price
    })

    return totalPrice
  }, [])
  
  React.useEffect(() => {
    if (token === null) {
      navigate('http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&redirect_uri=http://localhost:8000/login-callback&response_type=code&scope=openid')
    }
  }, [])

  React.useEffect(() => {
    clearCartItems()
  }, [])

  const handleConfirmPayment = () => {
    axios.put("http://localhost:9000/orders/" + orderId + "/status", {
      status: "confirmed"
    }, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(() => navigate('/'))
  }
  
  return (
    <main style={{backgroundColor: '#f9f9f9', minHeight: '100vh'}}>
      <AppBar userName={profileName} />
      <Box sx={{m: 4}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Payment</Typography>
      </Box>

      <Grid container spacing={2} sx={{mt: 4, mb: 4, mx: 32, backgroundColor: '#fff', borderRadius: 2, p: 4}}>
        <Grid size={12}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align='center'>How To Pay</Typography>
          <Typography variant="body1" gutterBottom align='center'>
            To complete your order, please pay the order to the following bank account (Bank Central Asia)
          </Typography>
          <Typography variant="h3" gutterBottom sx={{textAlign: 'center', border: '1px dashed #000', borderRadius: 2, p: 2, mx: 16 }}>
            4500855552
          </Typography>
          <Typography variant="body1" gutterBottom sx={{textAlign: 'center'}} fontWeight="bold">Total Amount</Typography>
          <Typography variant="h4" gutterBottom sx={{textAlign: 'center', border: '1px dashed #000', borderRadius: 2, p: 2, mx: 24 }}>
            IDR {new Intl.NumberFormat("id").format(totalPrice)}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{textAlign: 'center'}}>
            Please transfer the amount to the bank account above before the order deadline is over.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{textAlign: 'center'}}>
            After the transfer, please click confirm payment button below and send the proof of payment to the following email <a href="mailto:bambang_sudarsono@yahoo.com">bambang_sudarsono@yahoo.com</a>
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
            <Button variant="contained" color="warning" size="large" onClick={handleConfirmPayment}>
              <Typography variant="h6" fontWeight="bold">Confirm Payment</Typography>
            </Button>
          </Box>
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

export default PaymentPage

export const Head = () => {
  return (
    <>
      <title>Payment | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}