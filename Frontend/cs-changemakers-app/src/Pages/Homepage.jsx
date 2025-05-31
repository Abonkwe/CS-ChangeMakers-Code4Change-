import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { Star } from '@mui/icons-material';
import heroImage from '../assets/bg3.jpg';
import aboutImage from '../assets/bg1.jpg';
import mentor1 from '../assets/men1.jpg';
import mentor2 from '../assets/men2.jpg';
import mentor3 from '../assets/men3.jpg';
import mentor4 from '../assets/men4.jpg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const mentors = [
  { name: 'Alex Johnson', title: 'Senior Software Engineer', rating: 4.8, image: mentor1 },
  { name: 'Sarah Lee', title: 'Product Manager', rating: 4.9, image: mentor2 },
  { name: 'David Kim', title: 'UX Designer', rating: 4.7, image: mentor3 },
  { name: 'Emma Wilson', title: 'Data Scientist', rating: 5, image: mentor4 },
];

const comments = [
  { name: 'Jane Doe', text: 'TechBridge helped me land my dream job in tech!', avatar: mentor1 },
  { name: 'John Smith', text: 'Amazing mentorship experience, truly transformational.', avatar: mentor2 },
  { name: 'Emily Rose', text: 'I grew so much thanks to the supportive community.', avatar: mentor3 },
];

const Homepage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '75vh', md: '100vh' },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 3, md: 6 },
          color: 'white',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'relative', zIndex: 2, maxWidth: '700px', width: '100%' }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Welcome to TechBridge
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Mentorship, growth, and opportunities for tomorrow’s tech leaders.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '0.9rem', md: '1rem' }, px: { xs: 1, md: 3 } }}>
            Join our community of learners and professionals shaping the future of technology together.
          </Typography>
          <Button
            variant="contained"
            href="/get-started"
            sx={{
              borderRadius: '30px',
              backgroundColor: '#2ecc71',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.9rem', md: '1rem' },
              '&:hover': {
                backgroundColor: '#27ae60',
              },
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, backgroundColor: '#f0f4f5' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ flex: 1, marginRight: '2rem' }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#2ecc71', mb: 2 }}>
              Who We Are
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.05rem', lineHeight: 1.7 }}>
              TechBridge is a nonprofit organization using cutting-edge technology to break the cycle of generational poverty. We empower nonprofits and underserved communities with scalable tech platforms and workforce development solutions addressing hunger, homelessness, and social injustice.
            </Typography>
            <Button
              variant="contained"
              href="/about"
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
              Know More
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

      {/* Mentors Section */}
      <Box sx={{ py: 10, px: { xs: 3, md: 10 }, backgroundColor: '#fff' }}>
        <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 6, color: '#2c3e50' }}>
          Meet Our Mentors
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {mentors.map((mentor, index) => (
            <Grid item xs={12} sm={6} md={3} key={mentor.name}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Avatar
                    src={mentor.image}
                    alt={mentor.name}
                    sx={{ width: 80, height: 80, margin: '0 auto 16px auto' }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {mentor.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {mentor.title}
                    </Typography>
                    <Rating
                      value={mentor.rating}
                      precision={0.1}
                      readOnly
                      icon={<Star sx={{ color: '#f1c40f' }} />}
                      emptyIcon={<Star sx={{ opacity: 0.3 }} />}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Internships and Job Opportunities Section */}
      <Box sx={{ py: 10, px: { xs: 3, md: 10 }, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 6, color: '#2c3e50' }}>
          Explore Internships & Jobs
        </Typography>
        <Grid container spacing={4}>
          {/* Internship Opportunities */}
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 3,
                    height: '250px', // Uniform height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Frontend Developer Intern
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Internship · Remote
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CodeSprint Co. · San Francisco, CA
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 'auto',
                      borderRadius: '25px',
                      backgroundColor: '#2ecc71',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#27ae60',
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
          
          {/* Job Opportunities */}
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index + 4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }} // Slight delay for job cards
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 3,
                    height: '250px', // Uniform height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Backend Developer
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Full-time · Hybrid
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      DevHub Solutions · New York, NY
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 'auto',
                      borderRadius: '25px',
                      backgroundColor: '#2ecc71',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#27ae60',
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

 {/* Newsletter Section (Updated) */}
      <Box
        sx={{
          py: 8,
          px: { xs: 3, md: 10 },
          backgroundColor: '#2ecc71',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>
            Stay Connected with TechBridge
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, color: 'white' }}>
            Join our growing community of tech enthusiasts and professionals. Be the first to hear about new mentorship opportunities, internships, and events.
          </Typography>
        </motion.div>
      </Box>

      {/* Comments Section */}
      <Box sx={{ py: 10, px: { xs: 3, md: 10 }, backgroundColor: '#f4f6f8' }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 6, color: '#2c3e50' }}>
            What People Are Saying
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {comments.map((comment, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar src={comment.avatar} alt={comment.name} />
                      <Typography variant="h6" fontWeight="bold">
                        {comment.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      "{comment.text}"
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      <Footer />
    </div>
  );
};

export default Homepage;
