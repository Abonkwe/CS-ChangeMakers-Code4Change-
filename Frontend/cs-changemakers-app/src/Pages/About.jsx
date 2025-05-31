import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import aboutImage from '../assets/bg1.jpg';

const AboutPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, md: 10 },
          textAlign: 'center',
          backgroundColor: '#e8f5e9',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#2ecc71', mb: 2 }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: 700, mx: 'auto' }}>
            Welcome to TechBridge. Discover who we are, what we do, and why we do it. Learn about our mission to empower communities through technology.
          </Typography>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, backgroundColor: '#f0f4f5' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ flex: 1, marginRight: '2rem' }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#2ecc71', mb: 2 }}>
              Who We Are
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, fontSize: '1.05rem', lineHeight: 1.7 }}
            >
              TechBridge is a nonprofit organization using cutting-edge technology to break the cycle of generational poverty. We empower nonprofits and underserved communities with scalable tech platforms and workforce development solutions addressing hunger, homelessness, and social injustice.
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: '25px',
                backgroundColor: '#2ecc71',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#27ae60',
                },
              }}
            >
              Get Involved
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ flex: 1, textAlign: 'center' }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt="About TechBridge"
              sx={{ maxWidth: '100%', borderRadius: '16px', boxShadow: 3 }}
            />
          </motion.div>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default AboutPage;
