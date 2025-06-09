import * as React from 'react';
import { Box, Button, Container, Stack, Typography, Grid } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const services = [
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: 'Worldwide Delivery',
    subtitle: 'We offer competitive prices on',
  },
  {
    icon: <PaymentIcon fontSize="large" />,
    title: 'Safe Payment',
    subtitle: 'We offer competitive prices on',
  },
  {
    icon: <VerifiedUserIcon fontSize="large" />,
    title: 'Shop With Confidence',
    subtitle: 'We offer competitive prices on',
  },
  {
    icon: <HeadsetMicIcon fontSize="large" />,
    title: '24/7 Support',
    subtitle: 'We offer competitive prices on',
  },
];

export default function CtaSection() {
  const phoneNumber = '6281392116185';
  const prefilledMessage = encodeURIComponent("Hi! I'm interested in learning more about your gallery.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <>
      <Box sx={{ py: 10, backgroundColor: '#f0f4f8', mt: 4 }}>
        <Container>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              Have Questions or Ready to Connect?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Chat with us now on WhatsApp and let’s talk!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              sx={{
                backgroundColor: '#25D366',
                '&:hover': {
                  backgroundColor: '#1EBE5D',
                },
              }}
            >
              Chat on WhatsApp
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ 
        backgroundColor: '#fff', 
        borderTop: '1px solid #eee',
        display: {
          xs: 'none', // hide on xs
          sm: 'block', // show on sm and up
        },    
      }}>
        <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
          <Container>
            <Grid container spacing={2} justifyContent="space-between">
              {services.map((item, idx) => (
                <Grid size={3} key={idx}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        backgroundColor: '#f3f3f3',
                        borderRadius: 2,
                        p: 1.5,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography fontWeight={600}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
