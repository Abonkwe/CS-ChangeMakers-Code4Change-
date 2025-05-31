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
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const jobs = [
  {
    company: 'NextGen Tech',
    title: 'Junior Frontend Developer',
    location: 'Remote',
    description:
      'Work with our UI team to develop responsive interfaces using React and TypeScript.',
    applyLink: 'https://nextgen.tech/jobs/frontend-dev',
  },
  {
    company: 'DataDriven Co.',
    title: 'Data Analyst',
    location: 'New York, NY',
    description:
      'Use data insights to drive decision-making and optimize business processes.',
    applyLink: 'https://datadriven.co/jobs/data-analyst',
  },
  {
    company: 'SecureNet Solutions',
    title: 'Cybersecurity Associate',
    location: 'San Francisco, CA',
    description:
      'Assist in managing security protocols and protecting organizational assets.',
    applyLink: 'https://securenet.com/careers/cybersecurity',
  },
  {
    company: 'AIWave',
    title: 'Machine Learning Engineer',
    location: 'Remote',
    description:
      'Develop and deploy scalable ML models for enterprise applications.',
    applyLink: 'https://aiwave.io/jobs/ml-engineer',
  },
];

const Job = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#f9fafb', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#2ecc71' }}
          >
            Job Opportunities
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 6, color: '#555' }}
          >
            Discover full-time tech roles suited for early-career professionals.
          </Typography>

          <Grid container spacing={4}>
            {jobs.map(({ company, title, location, description, applyLink }) => (
              <Grid key={title + company} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 10px 20px rgba(46, 204, 113, 0.3)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon sx={{ fontSize: 40, color: '#2ecc71', mr: 1 }} />
                      <Typography variant="h6" component="h2" sx={{ fontWeight: '600' }}>
                        {title}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      {company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Location:</strong> {location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      href={applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontWeight: '600' }}
                    >
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Job;
