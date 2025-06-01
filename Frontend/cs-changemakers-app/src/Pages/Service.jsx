import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const services = [
  {
    title: 'Technical Training',
    description:
      'Comprehensive training programs to help you master coding, software development, and emerging technologies.',
    icon: <SchoolIcon sx={{ fontSize: 50, color: '#2ecc71' }} />,
  },
  {
    title: 'Mentorship',
    description:
      'Connect with industry experts who guide you through career growth and technical challenges.',
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: '#2ecc71' }} />,
  },
  {
    title: 'Internship Placement',
    description:
      'Gain real-world experience with our curated internship opportunities in tech companies.',
    icon: <WorkIcon sx={{ fontSize: 50, color: '#2ecc71' }} />,
  },
  {
    title: 'Project Collaboration',
    description:
      'Work on impactful projects that build your portfolio and practical skills.',
    icon: <CodeIcon sx={{ fontSize: 50, color: '#2ecc71' }} />,
  },
];

const Service = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, backgroundColor: '#f5f7fa' }}>
        {/* Optional background pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/bg1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.07,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#2ecc71' }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 6, color: '#444' }}
          >
            Empowering your tech journey with expert training, mentorship, internships, and project opportunities.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {services.map(({ title, description, icon }) => (
              <Grid key={title} item xs={12} sm={6} md={3} display="flex" justifyContent="center">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 320,
                    height: '100%',
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(46, 204, 113, 0.25)',
                    },
                  }}
                >
                  {icon}
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, fontWeight: '600', color: '#333' }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Service;
