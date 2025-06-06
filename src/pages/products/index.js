import * as React from "react"
import '../../style/style.css';
import { useAuth } from '../../context/auth-context';
import { Grid, Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import AppBar from '../../components/app-bar';
import CartDrawer from '../../components/cart';
import SeamlessProductCard from '../../components/seamless-product-card';
import PaginationComponent from '../../components/pagination';
import { navigate } from 'gatsby';
import { default as axios } from 'axios';
import LoginModalComponent from "../../components/login-modal";

const categories = [
  'All',
  'Nature',
  'Landscape',
  'Wall Art',
  'Flower',
  'Animal',
];

const ProductListPage = () => {
  const { token, profileName } = useAuth();
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then(function (response) {
      setProducts(response.data)
    })
  }, [])

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)

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
    <main>
      <AppBar userName={profileName} cartOnClick={showCart} />
      <Grid container={true} spacing={2} sx={{m: 4}}>
        <Grid size={3}>
          <Box
            sx={{
              width: 240,
              borderRadius: 3,
              backgroundColor: '#f9f9f9',
              p: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Categories
            </Typography>

            <List disablePadding>
              {categories.map((cat) => (
                <ListItemButton key={cat} sx={{ borderRadius: 1 }}>
                  <ListItemText primary={cat} primaryTypographyProps={{ fontSize: 15 }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid container spacing={2} size={8}>
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

          <Grid size={12}>
            <PaginationComponent count={100} page={1} />
          </Grid>
        </Grid>
      </Grid>

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />

      {modal}
    </main>
  )
}

export default ProductListPage

export const Head = () => {
  return (
    <>
      <title>Product List | BESArt Gallery</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}