import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';


const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'In Progress',
    githubLink: 'https://github.com/example/ecommerce-platform',
    demoLink: 'https://ecommerce-demo.vercel.app',
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on E-Commerce Platform',
  },
  {
    title: 'AI Task Scheduler',
    description: 'An intelligent task management system that uses machine learning to optimize scheduling and prioritize tasks based on user behavior patterns.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    status: 'Planning',
    githubLink: 'https://github.com/example/ai-scheduler',
    demoLink: null,
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on AI Task Scheduler',
  },
  {
    title: 'Social Media Analytics',
    description: 'A comprehensive dashboard for analyzing social media metrics across multiple platforms. Provides insights on engagement, reach, and audience demographics.',
    technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    status: 'Completed',
    githubLink: 'https://github.com/example/social-analytics',
    demoLink: 'https://social-analytics-demo.netlify.app',
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on Social Media Analytics',
  },
  {
    title: 'IoT Home Automation',
    description: 'Smart home system that controls lights, temperature, and security through a mobile app. Built with Arduino, Raspberry Pi, and React Native.',
    technologies: ['React Native', 'Arduino', 'Raspberry Pi', 'MQTT'],
    status: 'In Progress',
    githubLink: 'https://github.com/example/iot-home',
    demoLink: null,
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on IoT Home Automation',
  },
  {
    title: 'Blockchain Voting System',
    description: 'A secure and transparent voting platform built on blockchain technology. Ensures vote integrity while maintaining voter anonymity.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    status: 'Planning',
    githubLink: 'https://github.com/example/blockchain-voting',
    demoLink: null,
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on Blockchain Voting System',
  },
  {
    title: 'Weather Prediction ML',
    description: 'Machine learning model that predicts weather patterns using historical data and real-time atmospheric conditions. Includes a web interface for visualization.',
    technologies: ['Python', 'scikit-learn', 'Flask', 'Chart.js'],
    status: 'Completed',
    githubLink: 'https://github.com/example/weather-ml',
    demoLink: 'https://weather-prediction-ml.herokuapp.com',
    collaborateLink: 'mailto:contact@example.com?subject=Collaboration on Weather Prediction ML',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return '#2ecc71';
    case 'In Progress':
      return '#f39c12';
    case 'Planning':
      return '#3498db';
    default:
      return '#95a5a6';
  }
};

const Projects = () => {
  return (
    <div>
        <Navbar/>
    <Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, backgroundColor: '#f9f9f9' }}>
      {/* Background overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(52, 152, 219, 0.05) 100%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#2ecc71' }}
        >
          My Projects
        </Typography>

        <Typography
          variant="h6"
          align="center"
          paragraph
          sx={{ mb: 6, color: '#444' }}
        >
          Explore my latest projects and collaborate with me to build something amazing together.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {projects.map(({ title, description, technologies, status, githubLink, demoLink, collaborateLink }) => (
            <Grid key={title} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 380,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 24px rgba(46, 204, 113, 0.25)',
                  },
                  p: 2,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: 14,
                        color: '#2ecc71',
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 18 }} />
                      Project
                    </Typography>
                    <Chip
                      label={status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(status),
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                      }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                    {title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600', color: '#444' }}>
                      Technologies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.7rem',
                            height: '24px',
                            borderColor: '#2ecc71',
                            color: '#2ecc71',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<GitHubIcon />}
                      sx={{
                        color: '#333',
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        px: 1,
                      }}
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </Button>
                    {demoLink && (
                      <Button
                        size="small"
                        startIcon={<LaunchIcon />}
                        sx={{
                          color: '#3498db',
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          minWidth: 'auto',
                          px: 1,
                        }}
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </Button>
                    )}
                  </Box>
                  
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: '#2ecc71',
                      color: '#fff',
                      fontWeight: '600',
                      textTransform: 'none',
                      px: 3,
                      borderRadius: '25px',
                      fontSize: '0.8rem',
                      '&:hover': {
                        bgcolor: '#27ae60',
                      },
                    }}
                    href={collaborateLink}
                  >
                    Collaborate
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    <Footer />
    </div>
  );
};

export default Projects;