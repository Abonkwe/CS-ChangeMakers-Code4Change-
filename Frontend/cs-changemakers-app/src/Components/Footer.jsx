import React from 'react';
import { Box, Typography, Grid, IconButton, Link, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2ecc71',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 8,
      }}
    >
      <Grid container spacing={4} justifyContent="center" sx={{ px: { xs: 3, md: 8 } }}>
        {/* About Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            TechBridge
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 300 }}>
            Empowering the next generation of tech leaders through mentorship, community, and real-world opportunities.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Quick Links
          </Typography>
          <Stack spacing={1}>
            {[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' },
              { label: 'Mentors', href: '/mentors' },
              { label: 'Internship Opportunities', href: '/internships' },
              { label: 'Services', href: '/services' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                color="inherit"
                underline="hover"
                sx={{
                  '&:hover': {
                    color: '#d4f8e8',
                    pl: 1,
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Follow Us
          </Typography>
          <Box>
            {[
              { icon: <FacebookIcon />, href: 'https://www.facebook.com' },
              { icon: <TwitterIcon />, href: 'https://www.twitter.com' },
              { icon: <LinkedInIcon />, href: 'https://www.linkedin.com' },
              { icon: <GitHubIcon />, href: 'https://www.github.com' },
            ].map(({ icon, href }, idx) => (
              <IconButton
                key={idx}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#d4f8e8',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} TechBridge. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
