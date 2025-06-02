import * as React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from '../components/app-bar';
import Banner from '../components/banner';
import SeamlessProductCard from '../components/seamless-product-card';
import FooterSection from '../components/footer';
import CtaSection from "../components/cta";
import '../style/style.css';
import { useAuth } from '../context/auth-context';
import CartDrawer from '../components/cart';
import { navigate } from 'gatsby';
import Modal from "@mui/material/Modal";

const IndexPage = () => {
  const { token, profileName } = useAuth();

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false);
  const [loginModalShowed, setLoginModalShowed] = React.useState(false);

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
    modal = (
      <Modal 
        open={loginModalShowed}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Required
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Before proceed any further transaction, you need to signup / login first.
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} href="http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&redirect_uri=http://localhost:8000/login-callback&response_type=code&scope=openid">Sign Up / Login</Button>
        </Box>
      </Modal>
    )
  } else {
    modal = ""
  }
  
  return (
    <main>
      <AppBar userName={profileName} cartOnClick={showCart} />
      <Grid container spacing={2}>
        <Grid size={12}>
          <Banner image="https://template.getbazaar.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffurniture-2.36d363ad.jpg&w=3840&q=75" height={400} title="BESArt Gallery" />
        </Grid>
        <Grid size={7}>
          <Banner image="https://template.getbazaar.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-28.155ce85a.jpg&w=1920&q=75" height={300} title="Magelang Exhibition" />
        </Grid>
        <Grid size={5}>
          <Banner image="https://template.getbazaar.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-29.5947fa74.jpg&w=1920&q=75" height={300} title="Wall Art Gallery" />
        </Grid>
        <Grid size={12}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>Featured Gallery</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Most Popular Artworks</Typography>
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-2.png&w=828&q=75"
            name="Yellow Sofa"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-5.png&w=828&q=75"
            name="Single Round Sofa"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-8.png&w=828&q=75"
            name="Brown Table"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-8.png&w=828&q=75"
            name="Brown Table"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-2.png&w=828&q=75"
            name="Yellow Sofa"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
        <Grid size={4}>
          <SeamlessProductCard 
            image="https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-5.png&w=828&q=75"
            name="Single Round Sofa"
            price={184.0}
            oldPrice={230.0}
            rating={4}
            onClick={() => { navigate("/products/some-product") }}
          />
        </Grid>
      </Grid>
      <CtaSection />
      <FooterSection />

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />

      {modal}
    </main>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <>
      <title>Home | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}
