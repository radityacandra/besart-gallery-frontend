import * as React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function FooterSection() {
  return (
    <>
      <Box sx={{ py: 7, px: 4, borderTop: '1px solid #000' }}>
        <Grid container spacing={4}>
          {/* Left Side - Logo and description */}
          <Grid size={5}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 2, fontFamily: 'monospace' }}
            >
              BESArt Gallery
            </Typography>
            <Typography color="text.secondary">
              BESArt Gallery is the online showcase of renowned Indonesian painter Bambang Eko Sudarsono, whose initials form the heart of the brand. 
              With decades of artistic experience and a deep passion for capturing nature, culture, and emotion through brush and canvas, Bambang brings his original works directly to art enthusiasts around the world.
            </Typography>
          </Grid>

          {/* About Us */}
          <Grid size={2}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            {['Careers', 'Our Stores', 'Our Cares', 'Terms & Conditions', 'Privacy Policy'].map(
              (item, i) => (
                <Link
                  key={i}
                  href="#"
                  underline="none"
                  display="block"
                  color="text.primary"
                  sx={{ my: 0.5, fontFamily: 'roboto' }}
                >
                  {item}
                </Link>
              )
            )}
          </Grid>

          {/* Customer Care */}
          <Grid size={2}>
            <Typography variant="h6" gutterBottom>
              Customer Care
            </Typography>
            {[
              'Help Center',
              'Track Your Order',
              'Corporate & Bulk Purchasing',
              'Returns & Refunds',
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                underline="none"
                display="block"
                color="text.primary"
                sx={{ my: 0.5, fontFamily: 'roboto' }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Contact Us */}
          <Grid size={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: Jalan KH. Isom No 05 RT 05 RW 05 Bancaan Tengah, Salatiga
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Email: bambang_sudarsono@yahoo.com
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Phone: +6281-123-456-789
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          mt: 1,
          pt: 2,
          borderTop: '1px solid #000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 2
        }}
        >
        <Stack direction="row" spacing={1} mb={2}>
          <IconButton><TwitterIcon /></IconButton>
          <IconButton><FacebookIcon /></IconButton>
          <IconButton><InstagramIcon /></IconButton>
          <IconButton><YouTubeIcon /></IconButton>
          <IconButton><GoogleIcon /></IconButton>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} By BESArt Gallery. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};
