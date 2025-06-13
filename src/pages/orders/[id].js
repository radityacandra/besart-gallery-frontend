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
import { default as axios } from 'axios';

const OrderDetailPage = ({ params }) => {
  const { token, profileName } = useAuth();
  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)
  const [order, setOrder] = React.useState({
    shipping: {},
    orderItems: []
  })

  React.useEffect(() => {
    axios.get("https://api.besarts.biz.id/orders/" + params.id, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      setOrder(response.data)
    })
  }, [])

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

  const orderId = order.id
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
              <Typography variant="body1" align="left">{order.id}</Typography>
            </Grid>

            <Grid size={{md: 6, xs: 12}}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Order Time</Typography>
              <Typography variant="body1" align="left">{order.orderTime}</Typography>
            </Grid>
            
            <Grid size={{md: 6, xs: 12}}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Order Status</Typography>
              <Box display="flex" justifyContent="left" alignItems="center">
                <Chip label={order.status} color={order.status === "open" ? "warning" : "primary"} />
                {
                  order.status === "open" && <Link href={whatsappLink} underline="none" variant="subtitle1">&nbsp; Confirm Now</Link>
                }
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
              <Typography variant="body1" align="left">{order.shipping.fullName}</Typography>
            </Grid>
            
            <Grid size={{md: 6, xs: 12}}>
            <Typography variant="subtitle1" align="left" color="textSecondary">Phone Number</Typography>
              <Typography variant="body1" align="left">{order.shipping.phoneNumber}</Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle1" align="left" color="textSecondary">Full Address</Typography>
              <Typography variant="body1" align="left">{order.shipping.fullAddress}</Typography>
            </Grid>

            <Grid size={12}>
            <Typography variant="subtitle1" align="left" color="textSecondary">Additional Notes</Typography>
              <Typography variant="body1" align="left">{order.shipping.notes ? order.shipping.notes : "-"}</Typography>
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

            {order.orderItems.map((item) => (
              <Grid size={12} key={item.id}>
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
                    src={item.productImage}
                    alt={item.productName}
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
                      {item.productName}
                    </Typography>
                  </Box>

                  {/* Right: Quantity & Price */}
                  <Box whiteSpace="nowrap" sx={{
                    display: {
                      xs: 'none', // hide on xs
                      sm: 'block', // show on sm and up
                    }}}>
                    <Typography variant="body1">
                      {item.qty} x IDR {new Intl.NumberFormat("id").format(item.productPrice)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
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
