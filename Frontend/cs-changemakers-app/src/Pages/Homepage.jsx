import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Grid, 
  Rating, 
  Container,
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Code, 
  Business, 
  Science, 

  LocationOn,
  Schedule,
  CheckCircle
} from '@mui/icons-material';
import GridViewIcon from '@mui/icons-material/GridView';
import heroImage from '../assets/bg3.jpg';
import aboutImage from '../assets/bg1.jpg';
import mentor1 from '../assets/men1.jpg';
import mentor2 from '../assets/men2.jpg';
import mentor3 from '../assets/men3.jpg';
import mentor4 from '../assets/men4.jpg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const mentors = [
  { 
    name: 'Alex Johnson', 
    title: 'Senior Software Engineer', 
    company: 'Google',
    rating: 4.8, 
    image: mentor1,
    expertise: ['React', 'Node.js', 'AWS'],
    experience: '8+ years'
  },
  { 
    name: 'Sarah Lee', 
    title: 'Product Manager', 
    company: 'Microsoft',
    rating: 4.9, 
    image: mentor2,
    expertise: ['Strategy', 'Analytics', 'Agile'],
    experience: '6+ years'
  },
  { 
    name: 'David Kim', 
    title: 'UX Designer', 
    company: 'Apple',
    rating: 4.7, 
    image: mentor3,
    expertise: ['Figma', 'User Research', 'Prototyping'],
    experience: '5+ years'
  },
  { 
    name: 'Emma Wilson', 
    title: 'Data Scientist', 
    company: 'Tesla',
    rating: 5, 
    image: mentor4,
    expertise: ['Python', 'ML', 'Analytics'],
    experience: '7+ years'
  },
];

const jobOpportunities = [
  {
    title: 'Frontend Developer Intern',
    company: 'CodeSprint Co.',
    location: 'San Francisco, CA',
    type: 'Internship',
    mode: 'Remote',
    icon: <Code />,
    salary: '$25-30/hr',
    featured: true
  },
  {
    title: 'Backend Developer',
    company: 'DevHub Solutions',
    location: 'New York, NY',
    type: 'Full-time',
    mode: 'Hybrid',
    icon: <Code />,
    salary: '$95-120k',
    featured: false
  },
  {
    title: 'Product Manager Intern',
    company: 'InnovateTech',
    location: 'Austin, TX',
    type: 'Internship',
    mode: 'On-site',
    icon: <Business />,
    salary: '$28-35/hr',
    featured: true
  },
  {
    title: 'Data Analyst',
    company: 'DataFlow Inc.',
    location: 'Seattle, WA',
    type: 'Full-time',
    mode: 'Remote',
    icon: <Science />,
    salary: '$75-90k',
    featured: false
  },
  {
    title: 'UX Designer Intern',
    company: 'DesignForward',
    location: 'Los Angeles, CA',
    type: 'Internship',
    mode: 'Hybrid',
    icon: <GridViewIcon />,
    salary: '$22-28/hr',
    featured: false
  },
  {
    title: 'Full Stack Developer',
    company: 'TechNova',
    location: 'Boston, MA',
    type: 'Full-time',
    mode: 'Remote',
    icon: <Code />,
    salary: '$105-130k',
    featured: true
  },
  {
    title: 'ML Engineer Intern',
    company: 'AI Dynamics',
    location: 'Palo Alto, CA',
    type: 'Internship',
    mode: 'On-site',
    icon: <Science />,
    salary: '$35-42/hr',
    featured: false
  },
  {
    title: 'Product Designer',
    company: 'Creative Labs',
    location: 'Chicago, IL',
    type: 'Full-time',
    mode: 'Hybrid',
    icon: <GridViewIcon />,
    salary: '$85-110k',
    featured: false
  }
];

const testimonials = [
  { 
    name: 'Jane Doe', 
    text: 'TechBridge transformed my career trajectory. The mentorship program connected me with industry leaders who provided invaluable guidance.', 
    avatar: mentor1,
    role: 'Software Engineer at Meta',
    rating: 5
  },
  { 
    name: 'John Smith', 
    text: 'The community at TechBridge is incredibly supportive. I landed three interviews within a month of joining their job placement program.', 
    avatar: mentor2,
    role: 'Product Manager at Spotify',
    rating: 5
  },
  { 
    name: 'Emily Rose', 
    text: 'From bootcamp graduate to senior developer in 18 months. TechBridge made the impossible possible with their structured learning path.', 
    avatar: mentor3,
    role: 'Senior Developer at Airbnb',
    rating: 5
  },
];

const Homepage = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div>
      <Navbar />

      {/* Enhanced Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '100vh', md: '110vh' },
          backgroundImage: `linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              type: "spring",
              stiffness: 100
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              TechBridge
            </Typography>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 400,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.4,
                }}
              >
                Bridging the gap between ambition and achievement in tech
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Connect with industry mentors, access exclusive opportunities, and accelerate your journey in technology
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  href="/get-started"
                  sx={{
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 32px rgba(46, 204, 113, 0.4)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(46, 204, 113, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/explore"
                  sx={{
                    borderRadius: '50px',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Programs
                </Button>
              </Stack>
            </motion.div>
          </motion.div>
        </Container>

        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            zIndex: 2,
            opacity: 0.1
          }}
        >
          <Code sx={{ fontSize: 60, color: 'white' }} />
        </motion.div>
      </Box>

      {/* Enhanced About Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        px: { xs: 3, md: 0 }, 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: '#2ecc71', 
                    fontWeight: 700,
                    letterSpacing: 2,
                    mb: 1
                  }}
                >
                  About TechBridge
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 3,
                    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2
                  }}
                >
                  Empowering the Next Generation of Tech Leaders
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4, 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8,
                    color: '#5a6c7d'
                  }}
                >
                  TechBridge is more than a nonprofit—we're a catalyst for change. Using cutting-edge technology 
                  and innovative workforce development solutions, we're breaking the cycle of generational poverty 
                  by empowering underserved communities with the skills and opportunities they need to thrive in 
                  the digital economy.
                </Typography>
                
                <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2ecc71' }}>
                      10K+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lives Changed
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2ecc71' }}>
                      500+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mentors
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2ecc71' }}>
                      95%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Job Placement
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  href="/about"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(46, 204, 113, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(46, 204, 113, 0.4)',
                    },
                  }}
                >
                  Learn More About Us
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      right: -20,
                      bottom: -20,
                      background: 'linear-gradient(135deg, #2ecc71, #3498db)',
                      borderRadius: 4,
                      zIndex: 1,
                      opacity: 0.1
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={aboutImage}
                    alt="About TechBridge"
                    sx={{ 
                      width: '100%',
                      borderRadius: 4, 
                      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Mentors Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#2ecc71', 
                  fontWeight: 700,
                  letterSpacing: 2,
                  mb: 1
                }}
              >
                Expert Mentorship
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Learn from Industry Leaders
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Connect with experienced professionals who are passionate about helping you succeed
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {mentors.map((mentor, index) => (
                <Grid item xs={12} sm={6} md={3} key={mentor.name}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'grey.100',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                          borderColor: '#2ecc71',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                        <Avatar
                          src={mentor.image}
                          alt={mentor.name}
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            margin: '0 auto',
                            border: '4px solid',
                            borderColor: 'grey.100',
                            transition: 'all 0.3s ease'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                            backgroundColor: '#2ecc71',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 16, color: 'white' }} />
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {mentor.name}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                          {mentor.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {mentor.company} • {mentor.experience}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Rating
                            value={mentor.rating}
                            precision={0.1}
                            readOnly
                            size="small"
                            icon={<Star sx={{ color: '#f1c40f' }} />}
                            emptyIcon={<Star sx={{ opacity: 0.3 }} />}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            ({mentor.rating})
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                          {mentor.expertise.slice(0, 2).map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: alpha('#2ecc71', 0.1),
                                color: '#2ecc71',
                                fontSize: '0.75rem',
                                height: 24
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Enhanced Jobs Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        px: { xs: 3, md: 0 }, 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#2ecc71', 
                  fontWeight: 700,
                  letterSpacing: 2,
                  mb: 1
                }}
              >
                Career Opportunities
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Your Next Opportunity Awaits
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Discover internships and full-time positions from top tech companies
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={3}>
              {jobOpportunities.map((job, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 4,
                        border: job.featured ? '2px solid #2ecc71' : '1px solid #e9ecef',
                        background: job.featured 
                          ? 'linear-gradient(135deg, rgba(46, 204, 113, 0.05) 0%, rgba(52, 152, 219, 0.05) 100%)'
                          : 'white',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      {job.featured && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: alpha('#2ecc71', 0.1),
                            borderRadius: 2,
                            p: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {job.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                            {job.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.company}
                          </Typography>
                        </Box>
                      </Box>

                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location} • {job.mode}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.type}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp sx={{ fontSize: 16, color: '#2ecc71', mr: 1 }} />
                          <Typography variant="body2" sx={{ color: '#2ecc71', fontWeight: 600 }}>
                            {job.salary}
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        variant={job.featured ? "contained" : "outlined"}
                        fullWidth
                        sx={{
                          borderRadius: '25px',
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          ...(job.featured ? {
                            background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                            },
                          } : {
                            borderColor: '#2ecc71',
                            color: '#2ecc71',
                            '&:hover': {
                              backgroundColor: alpha('#2ecc71', 0.05),
                            },
                          })
                        }}
                      >
                        Apply Now
                      </Button>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Enhanced Newsletter Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, md: 0 },
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center">
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: 'white',
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)'
                }}
              >
                Ready to Transform Your Future?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.7
                }}
              >
                Join thousands of professionals who've accelerated their tech careers through our community. 
                Get exclusive access to mentorship, job opportunities, and industry insights.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="/join"
                  sx={{
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    color: '#2ecc71',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Join Our Community
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/newsletter"
                  sx={{
                    borderRadius: '50px',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Subscribe to Newsletter
                </Button>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                    50K+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Community Members
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                    1000+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Success Stories
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
                    200+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Partner Companies
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Enhanced Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 0 }, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#2ecc71', 
                  fontWeight: 700,
                  letterSpacing: 2,
                  mb: 1
                }}
              >
                Success Stories
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                What Our Community Says
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Real stories from real people who transformed their careers with TechBridge
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card 
                      sx={{ 
                        p: 4, 
                        height: '100%',
                        borderRadius: 4, 
                        border: '1px solid #e9ecef',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                          borderColor: '#2ecc71'
                        },
                        '&::before': {
                          content: '"❝"',
                          position: 'absolute',
                          top: 16,
                          right: 20,
                          fontSize: '3rem',
                          color: '#2ecc71',
                          opacity: 0.3,
                          fontFamily: 'serif'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            mr: 2,
                            border: '3px solid #f0f0f0'
                          }}
                        />
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3,
                          fontStyle: 'italic',
                          lineHeight: 1.7,
                          color: '#5a6c7d'
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          size="small"
                          icon={<Star sx={{ color: '#f1c40f' }} />}
                          emptyIcon={<Star sx={{ opacity: 0.3 }} />}
                        />
                        <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                          Verified Review
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </div>
  );
};

export default Homepage;