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
      <Box sx={{ backgroundColor: '#f5f7fa', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
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
            sx={{ mb: 6, color: '#555' }}
          >
            Empowering your tech journey with expert training, mentorship, internships, and project opportunities.
          </Typography>

          <Grid container spacing={4}>
            {services.map(({ title, description, icon }) => (
              <Grid key={title} item xs={12} sm={6} md={3} display="flex" justifyContent="center">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    maxWidth: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 20px rgba(46, 204, 113, 0.3)',
                    },
                  }}
                >
                  {icon}
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mt: 2, mb: 1, fontWeight: '600' }}
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
