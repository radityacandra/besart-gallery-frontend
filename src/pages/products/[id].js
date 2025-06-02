import * as React from "react"
import '../../style/style.css';
import { useAuth } from '../../context/auth-context';
import { useCart } from '../../context/cart-context';
import AppBar from '../../components/app-bar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from "@mui/material/Container";
import { Link } from 'gatsby'
import MuiLink from '@mui/material/Link'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import FooterSection from '../../components/footer';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CartDrawer from '../../components/cart';

const ProductListPage = () => {
  const { token, profileName } = useAuth();
  const { addCartItems } = useCart();

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false);

  function showCart() {
    setCartDrawerShowed(true)
  }

  function closeCart() {
    setCartDrawerShowed(false)
  }

  function addToCartHandler() {
    addCartItems({
      id: product.id,
      name: product.name,
      price: product.price
    })
  }

  const product = {
    id: "1c9f8d08-4e79-42bd-a4d2-5b289bbd7f50",
    name: "Sunset Over Still Waters",
    price: "10000000",
    dimension: "120 x 80 cm",
    medium: "Oil Painting on Canvas",
    image: "https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-2.png&w=828&q=75",
    description: "As the golden sun dips below the horizon, it casts a warm, amber glow across a tranquil lake, capturing a fleeting moment of perfect stillness. “Sunset Over Still Waters” evokes a sense of calm and introspection — a gentle balance between light and shadow, movement and rest.\n\nWith delicate brushstrokes and a rich color palette, this piece invites the viewer into a quiet world where time seems to pause. Ideal for living spaces or galleries that celebrate peace, nature, and emotional depth."
  }

  return (
    <main>
      <AppBar userName={profileName} cartOnClick={showCart} />
      <Container sx={{m: 4}}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink
            component={Link}
            underline="none"
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            to="/">
            HOME
          </MuiLink>
          <MuiLink component={Link}
            underline="none"
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
            to="/products">
            Products
          </MuiLink>
          <Typography sx={{ color: 'text.primary' }}>{product.name}</Typography>
        </Breadcrumbs>
      </Container>
      <Grid container sx={{m: 4}} spacing={2}>
        <Grid size={12}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              height: 500,
              backgroundImage: `url(https://template.getbazaar.io/_next/image?url=%2Fassets%2Fimages%2Ffurniture-products%2Ffurniture-2.png&w=828&q=75)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          ></Box>
        </Grid>
        <Grid size={8}>
          <Typography variant="h4" fontWeight="medium" color="text.primary">
            {product.title}
          </Typography>
          <Typography variant="h5">
            IDR {new Intl.NumberFormat("id").format(product.price)}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Medium: {product.medium} | Dimensions: {product.dimension}
          </Typography>
        </Grid>

        <Grid display="flex" size={4} sx={{justifyContent:"right", alignItems: "center"}}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={addToCartHandler}>Add To Cart</Button>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Typography variant="h6" sx={{mb: 2}}>
            Descriptions
          </Typography>
          <Typography variant="body1">
            {product.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Grid>
      </Grid>

      <CartDrawer open={cartDrawerShowed} onClose={closeCart} />

      <FooterSection />
    </main>
  )
}

export default ProductListPage

export const Head = () => {
  return (
    <>
      <title>Sunset Over Still Waters | Product</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}