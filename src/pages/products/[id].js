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
import { default as axios } from 'axios';
import LoginModalComponent from "../../components/login-modal";

const ProductListPage = ({ params }) => {
  const { token, profileName } = useAuth()
  const { addCartItems } = useCart()

  const [cartDrawerShowed, setCartDrawerShowed] = React.useState(false)
  const [loginModalShowed, setLoginModalShowed] = React.useState(false)

  const [product, setProduct] = React.useState({
    description: ""
  })

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

  function addToCartHandler() {
    if (token) {
      addCartItems({
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image
      })
    } else {
      setLoginModalShowed(true)
    }
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
    axios.get("http://localhost:9000/products/" + params.id).then(function (response) {
      setProduct(response.data)
    })
  }, [params.id])

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
              backgroundImage: `url(` + product.image + `)`,
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
            {product.name}
          </Typography>
          <Box display="flex" justifyContent="left" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="h5">
              IDR {new Intl.NumberFormat("id").format(product.discountedPrice)}
            </Typography>
            <Typography variant="h5" sx={{ textDecoration: 'line-through', color: '#999' }}>
              IDR {new Intl.NumberFormat("id").format(product.originalPrice)}
            </Typography>
          </Box>
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

      {modal}
    </main>
  )
}

export default ProductListPage

export const Head = () => {
  return (
    <>
      <title>Sunset Over The Lake | Product</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </>
  )
}