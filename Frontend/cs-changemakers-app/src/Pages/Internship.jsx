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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const internships = [
  {
    company: 'Tech Solutions Inc.',
    role: 'Frontend Developer Intern',
    duration: 'June 2025 - August 2025',
    description:
      'Work with our frontend team to build engaging user interfaces using React and Material UI.',
    applyLink: 'https://techsolutions.com/internship/frontend',
  },
  {
    company: 'InnovateX Labs',
    role: 'Data Science Intern',
    duration: 'July 2025 - September 2025',
    description:
      'Analyze data and build predictive models to support product development initiatives.',
    applyLink: 'https://innovatex.com/internship/data-science',
  },
  {
    company: 'CodeCraft Studios',
    role: 'Backend Developer Intern',
    duration: 'May 2025 - July 2025',
    description:
      'Assist in building scalable APIs and backend services using Node.js and Express.',
    applyLink: 'https://codecraftstudios.com/internship/backend',
  },
  {
    company: 'FutureTech AI',
    role: 'AI Research Intern',
    duration: 'June 2025 - August 2025',
    description:
      'Collaborate on AI research projects, implement ML algorithms, and contribute to publications.',
    applyLink: 'https://futuretechai.com/internship/ai-research',
  },
];

const Internship = () => {
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
            Internship Opportunities
          </Typography>

          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 6, color: '#444' }}
          >
            Explore curated internships to kickstart your career in tech.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {internships.map(({ company, role, duration, description, applyLink }) => (
              <Grid key={role + company} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
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
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: 14,
                        color: '#2ecc71',
                        mb: 0.5,
                      }}
                    >
                      <WorkOutlineIcon sx={{ fontSize: 18 }} />
                      {company}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
                      {role}
                    </Typography>

                    <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
                      <strong>Duration:</strong> {duration}
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
                      href={"/internshipform"}
                      target="_blank"
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

export default Internship;
