import * as React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AppBar from '../components/app-bar';
import Banner from '../components/banner';
import SeamlessProductCard from '../components/seamless-product-card';
import FooterSection from '../components/footer';
import CtaSection from "../components/cta";
import '../style/style.css';
import { useAuth } from '../context/auth-context';
import CartDrawer from '../components/cart';
import { navigate } from 'gatsby';
import { default as axios } from 'axios';
import LoginModalComponent from "../components/login-modal";

const IndexPage = () => {
  const { token, profileName } = useAuth();
  console.log("token: ", token)

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)
  const [products, setProducts] = React.useState([])

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

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then(function (response) {
      const featured = response.data.filter((_product, index) => {
        return index < 6
      })
      setProducts(featured)
    })
  }, [])
  
  return (
    <main>
      <AppBar userName={profileName} cartOnClick={showCart} />
      <Grid container spacing={2}>
        <Grid size={12}>
          <Banner image="https://i.etsystatic.com/25519175/r/il/035ff4/3614386124/il_1588xN.3614386124_6p1i.jpg" height={400} title="BESArt Gallery" />
        </Grid>
        <Grid size={7}>
          <Banner image="https://i.etsystatic.com/21973438/r/il/d65956/4743995523/il_1588xN.4743995523_lvqh.jpg" height={300} title="Magelang Exhibition" />
        </Grid>
        <Grid size={5}>
          <Banner image="https://i.etsystatic.com/16637099/r/il/e422b7/5944792552/il_1588xN.5944792552_7dba.jpg" height={300} title="Wall Art Gallery" />
        </Grid>
        <Grid size={12}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>Featured Gallery</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Most Popular Artworks</Typography>
        </Grid>
        
        {products.map((product) => (
          <Grid size={4} key={product.id}>
            <SeamlessProductCard 
                image={product.image}
                name={product.name}
                price={product.discountedPrice}
                oldPrice={product.originalPrice}
                rating={product.rating}
                onClick={() => { navigate("/products/" + product.id) }}
              />
          </Grid>
        ))}
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
