import React from 'react';
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
    return (
        <Box sx={{
            position: 'fixed',  // This makes the footer fixed
            bottom: 0,          // Anchors the footer to the bottom of the viewport
            left: 0,            // Extends the footer full width
            right: 0,           // Extends the footer full width
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            borderTop: '1px solid #e0e0e0',
            zIndex: 1000 // Ensure the footer stays on top of other content
        }}>
            <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram">
                <InstagramIcon style={{ color: '#E1306C' }} />
            </IconButton>
            <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FacebookIcon style={{ color: '#3b5998' }} />
            </IconButton>
            <IconButton href="https://wa.me/" target="_blank" aria-label="WhatsApp">
                <WhatsAppIcon style={{ color: '#25D366' }} />
            </IconButton>
        </Box>
    );
};

export default Footer;
