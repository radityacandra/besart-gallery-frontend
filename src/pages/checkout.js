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

const CheckoutPage = () => {
  const { token, profileName } = useAuth();

  return (
    <main style={{backgroundColor: '#f9f9f9'}}>
      <AppBar userName={profileName} />
      <Box sx={{m: 4}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Checkout</Typography>
      </Box>

      <Grid container={true} spacing={2} sx={{m: 4}}>
        <Grid size={8}>
          <Grid container={true} spacing={2} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            textAlign: 'center',
          }}>
            <Grid size={12}>
              <Typography variant="h6" align="left">Shipping Address</Typography>
            </Grid>
            <Grid size={6}>
              <TextField
                required
                fullWidth
                label="Full Name"></TextField>
            </Grid>
            
            <Grid size={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"></TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Full Address"></TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
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
            <Grid size={12}>
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
                  src="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-2.png&w=828&q=75"
                  alt="Sunset Over Still Waters"
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
                    Sunset Over Still Waters
                  </Typography>
                </Box>

                {/* Right: Quantity & Price */}
                <Box whiteSpace="nowrap">
                  <Typography variant="body1">
                    1 x IDR {new Intl.NumberFormat("id").format(10000000)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={4} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            height: 'fit-content'
          }}>
          <Box display="flex" sx={{
            justifyContent: "space-between"
          }}>
            <Typography color="text.secondary" variant="body1" sx={{textAlign: "left"}}>Subtotal</Typography>
            <Typography color="text.primary" variant="body1" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(10000000)}</Typography>
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
            <Typography color="text.primary" variant="h6" sx={{textAlign: "right"}}>IDR {new Intl.NumberFormat("id").format(10000000)}</Typography>
          </Box>

          <Button fullWidth variant="contained" color="primary" sx={{mt: 4}} onClick={() => navigate('/payment')}>Pay Now</Button>
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