import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import JobForm from '../Form/job';
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

const JobPage = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, backgroundColor: '#f9f9f9' }}>
        {/* Background overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/bg1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
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
            Job Opportunities
          </Typography>

          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 6, color: '#444' }}
          >
            Discover full-time tech roles suited for early-career professionals.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {jobs.map(({ company, title, location, description, applyLink }) => (
              <Grid key={title + company} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 360,
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <WorkIcon sx={{ fontSize: 20, color: '#2ecc71' }} />
                      <Typography variant="h6" sx={{ fontWeight: '600' }}>
                        {title}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontSize: 14, color: '#888', mb: 0.5 }}>
                      {company}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
                      <strong>Location:</strong> {location}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
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
                        '&:hover': {
                          bgcolor: '#27ae60',
                        },
                      }}
                      href={"/jobform"}
                      target="_new"
                      rel="noopener noreferrer"
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

export default JobPage;
