import * as React from "react"
import '../../style/style.css';
import { Helmet } from "react-helmet";
import AppBar from '../../components/app-bar';
import { useAuth } from '../../context/auth-context';
import LoginModalComponent from "../../components/login-modal";
import CartDrawer from '../../components/cart';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CardActionArea from "@mui/material/CardActionArea";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FooterSection from '../../components/footer';
import { navigate } from "gatsby";
import { default as axios } from 'axios';

const OrderListPage = () => {
  const { token, profileName } = useAuth();
  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)
  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    axios.get("https://api.besarts.biz.id/orders", {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(function(response) {
      setOrders(response.data.data)
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

  return (
    <main style={{backgroundColor: '#f9f9f9', minHeight: '100vh'}}>
      <Helmet>
        <title>Order List | BESArt Gallery</title>
      </Helmet>

      <AppBar userName={profileName} cartOnClick={showCart} />

      <div style={{minHeight: 500}}>
        <Grid container spacing={2} sx={{my: 4, mx: {xs: 2, md: 32}}}>
          <Grid size={12}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Order List</Typography>
          </Grid>

          {orders.map((order) => (
            <Grid size={12} key={order.id}>
              <CardActionArea onClick={() => navigate(`/orders/${order.id}`)} disableRipple sx={{backgroundColor: '#fff', borderRadius: 2, px: {md: 2, xs: 2}, py: 2, boxShadow: '0 2px rgba(0, 0, 0, 0.1)'}}>
                <Grid container spacing={2}>
                  <Grid size={4} sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant="subtitle1" color="textSecondary">{order.id}</Typography>
                  </Grid>
                  <Grid size={3} sx={{display: "flex", justifyContent: 'center'}}>
                    <Chip label={order.status} color={order.status === "open" ? "warning" : "primary"} />
                  </Grid>
                  <Grid size={3} sx={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                    <Typography variant="subtitle1">IDR {new Intl.NumberFormat("id").format(order.totalAmount)}</Typography>
                  </Grid>
                  <Grid size={2} sx={{display: "flex", alignItems: "center", justifyContent: "end"}}>
                    <ArrowRightAltIcon />
                  </Grid>
                </Grid>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>

      <div style={{marginTop: 4, backgroundColor: '#fff'}}>
        <FooterSection />
      </div>

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />

      {modal}
    </main>
  )
}

export default OrderListPage

export const Head = () => {
  return (
    <>
      <title>Order List | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}