import * as React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function LoginModalComponent({ open, onClose }) {
  return (
    <Modal 
        open={open}
        onClose={onClose}
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
          <Button variant="contained" sx={{ mt: 2 }} href="http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=myclient&redirect_uri=http://besarts.com/login-callback&response_type=code&scope=openid">Sign Up / Login</Button>
        </Box>
      </Modal>
  )
}