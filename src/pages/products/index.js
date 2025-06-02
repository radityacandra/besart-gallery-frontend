import * as React from "react"
import '../../style/style.css';
import { useAuth } from '../../context/auth-context';
import { Grid, Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import AppBar from '../../components/app-bar';
import CartDrawer from '../../components/cart';
import SeamlessProductCard from '../../components/seamless-product-card';
import PaginationComponent from '../../components/pagination';
import { navigate } from 'gatsby';

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

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false);

  function showCart() {
    setCartDrawerShowed(true)
  }

  function closeCart() {
    setCartDrawerShowed(false)
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

          <Grid size={12}>
            <PaginationComponent count={100} page={1} />
          </Grid>
        </Grid>
      </Grid>

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />
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