import * as React from "react"
import '../../style/style.css';
import { Helmet } from "react-helmet";
import { useAuth } from '../../context/auth-context';
import LoginModalComponent from "../../components/login-modal";
import AppBar from '../../components/app-bar';
import CartDrawer from '../../components/cart';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FooterSection from '../../components/footer';
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { navigate } from "gatsby";

const OrderDetailPage = ({ props }) => {
  const { token, profileName } = useAuth();
  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)

  if (!token) {
    navigate("/")
  }

  function showCart() {
    if (token) {
      setCartDrawerShowed(true)
    } else {
      setLoginModalShowed(true)
    }
  }

  function closeCart() {
    setCartDrawerShowed(false)
  }

  function closeModal() {
    setLoginModalShowed(false)
  }

  let modal = ""
  if (loginModalShowed) {
    modal = <LoginModalComponent open={loginModalShowed} onClose={closeModal} />
  } else {
    modal = ""
  }

  const orderId = '1a2af919-ac78-4e1b-93ac-4b46482422aa'
  const phoneNumber = '6281392116185';
  const prefilledMessage = encodeURIComponent(`Hi! I've paid the order and want to do confirmation on order ${orderId}`);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <main style={{backgroundColor: '#f9f9f9', minHeight: '100vh'}}>
      <Helmet>
        <title>Order Detail | BESArt Gallery</title>
      </Helmet>

      <AppBar userName={profileName} cartOnClick={showCart} />

      <Grid container spacing={2} sx={{my: 4, mx: {xs: 2, md: 32}}}>
        <Grid size={12}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Order Detail</Typography>
        </Grid>

        <Grid size={12}>
          <Grid container={true} spacing={2} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
          }}>
            <Grid size={12}>
              <Typography variant="h6" align="left">Order Information</Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Order ID</Typography>
              <Typography variant="body1" align="left">1a2af919-ac78-4e1b-93ac-4b46482422aa</Typography>
            </Grid>

            <Grid size={{md: 6, xs: 12}}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Order Time</Typography>
              <Typography variant="body1" align="left">12 June 2025 08:15 WIB</Typography>
            </Grid>
            
            <Grid size={{md: 6, xs: 12}}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Order Status</Typography>
              <Box display="flex" justifyContent="left" alignItems="center">
                <Chip label="waiting for confirmation" color="warning" />
                <Link href={whatsappLink} underline="none" variant="subtitle1">&nbsp; Confirm Now</Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
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
              <Typography variant="subtitle1" align="left" color="textSecondary">Full Name</Typography>
              <Typography variant="body1" align="left">John Doe</Typography>
            </Grid>
            
            <Grid size={{md: 6, xs: 12}}>
            <Typography variant="subtitle1" align="left" color="textSecondary">Phone Number</Typography>
              <Typography variant="body1" align="left">+6281123456789</Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Full Address</Typography>
              <Typography variant="body1" align="left">Jl KH. Isom No 05 RT 05 RW 05 Bancaan Tengah, Salatiga</Typography>
            </Grid>

            <Grid size={12}>
            <Typography variant="subtitle1" align="left" color="textSecondary">Additional Notes</Typography>
              <Typography variant="body1" align="left">Unit C6</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Grid container={true} spacing={2} sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: 2,
            textAlign: 'center',
            mt: 2,
          }}>
            <Grid size={12}>
              <Typography variant="h6" align="left">Items</Typography>
            </Grid>

            <Grid size={12} key="dd85f500-3632-4b40-96c1-867c58c3f61e">
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
                  src="https://i.etsystatic.com/53911636/r/il/7a2334/6751841022/il_1588xN.6751841022_5sy4.jpg"
                  alt="Parental Home"
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
                    Parental Home
                  </Typography>
                </Box>

                {/* Right: Quantity & Price */}
                <Box whiteSpace="nowrap" sx={{
                  display: {
                    xs: 'none', // hide on xs
                    sm: 'block', // show on sm and up
                  }}}>
                  <Typography variant="body1">
                    1 x IDR {new Intl.NumberFormat("id").format(10000000)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{marginTop: 4, backgroundColor: '#fff'}}>
        <FooterSection />
      </div>

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />

      {modal}
    </main>
  )
}

export default OrderDetailPage;

export const Head = () => {
  return (
    <>
      <title>Order Detail | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}
