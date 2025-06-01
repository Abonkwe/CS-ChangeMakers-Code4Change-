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
  Avatar,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const mentors = [
  {
    name: 'Alice Johnson',
    expertise: 'Full Stack Developer',
    bio: 'Alice has 10 years of experience building scalable web applications and mentoring junior developers.',
    contactLink: 'mailto:alice@example.com',
    avatarUrl: '',
  },
  {
    name: 'Bob Smith',
    expertise: 'Data Scientist',
    bio: 'Bob specializes in machine learning and data analytics with 8 years in the field.',
    contactLink: 'mailto:bob@example.com',
    avatarUrl: '',
  },
  {
    name: 'Carol Lee',
    expertise: 'UX/UI Designer',
    bio: 'Carol creates intuitive designs with a focus on accessibility and user experience.',
    contactLink: 'mailto:carol@example.com',
    avatarUrl: '',
  },
];

const Mentor = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ position: 'relative', py: { xs: 6, md: 10 }, backgroundColor: '#f9f9f9' }}>
        {/* Subtle Background Image */}
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
            Meet Our Mentors
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ mb: 6, color: '#444' }}
          >
            Connect with industry experts to accelerate your learning journey.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {mentors.map(({ name, expertise, bio, contactLink, avatarUrl }) => (
              <Grid key={name} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                      {avatarUrl ? (
                        <Avatar src={avatarUrl} sx={{ width: 56, height: 56 }} />
                      ) : (
                        <Avatar sx={{ bgcolor: '#2ecc71', width: 56, height: 56 }}>
                          <AccountCircleIcon sx={{ fontSize: 40, color: '#fff' }} />
                        </Avatar>
                      )}
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: '600' }}>
                          {name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {expertise}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {bio}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        bgcolor: '#2ecc71',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: '600',
                        '&:hover': {
                          bgcolor: '#27ae60',
                        },
                        borderRadius: '25px',
                        px: 3,
                      }}
                      href={contactLink}
                    >
                      Contact
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

export default Mentor;
