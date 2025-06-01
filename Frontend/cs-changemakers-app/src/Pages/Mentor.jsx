import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar'; // Adjust the import path as necessary
import Footer from '../Components/Footer'; // Adjust the import path as necessary
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Rating,
  Grid,
  Container,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import {
  Search,
  FilterList,
  AccessTime,
  AttachMoney,
  Person,
  Star
} from '@mui/icons-material';

const MentorListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      skill: "React Development",
      experience: "5 years",
      rating: 4.9,
      reviews: 127,
      price: 75,
      duration: "1 hour",
      bio: "Senior Frontend Developer at Meta with expertise in React, Redux, and modern JavaScript frameworks.",
      specialties: ["React", "Redux", "TypeScript", "Next.js"],
      avatar: "SC"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      skill: "Machine Learning",
      experience: "7 years",
      rating: 4.8,
      reviews: 89,
      price: 120,
      duration: "90 minutes",
      bio: "ML Engineer at Google with focus on deep learning and computer vision applications.",
      specialties: ["Python", "TensorFlow", "PyTorch", "Computer Vision"],
      avatar: "MR"
    },
    {
      id: 3,
      name: "Emma Thompson",
      skill: "UX/UI Design",
      experience: "6 years",
      rating: 4.9,
      reviews: 156,
      price: 85,
      duration: "1 hour",
      bio: "Lead UX Designer at Airbnb, specializing in user research and design systems.",
      specialties: ["Figma", "User Research", "Prototyping", "Design Systems"],
      avatar: "ET"
    },
    {
      id: 4,
      name: "David Kumar",
      skill: "Data Science",
      experience: "8 years",
      rating: 4.7,
      reviews: 203,
      price: 95,
      duration: "1 hour",
      bio: "Principal Data Scientist at Netflix with expertise in statistical modeling and analytics.",
      specialties: ["Python", "R", "SQL", "Statistics", "Tableau"],
      avatar: "DK"
    },
    {
      id: 5,
      name: "Lisa Wang",
      skill: "Product Management",
      experience: "9 years",
      rating: 4.8,
      reviews: 174,
      price: 110,
      duration: "1 hour",
      bio: "VP of Product at Stripe, experienced in scaling products from startup to enterprise.",
      specialties: ["Strategy", "Analytics", "Roadmapping", "Stakeholder Management"],
      avatar: "LW"
    },
    {
      id: 6,
      name: "Alex Johnson",
      skill: "DevOps Engineering",
      experience: "6 years",
      rating: 4.6,
      reviews: 92,
      price: 80,
      duration: "1 hour",
      bio: "Senior DevOps Engineer at AWS, expert in cloud infrastructure and automation.",
      specialties: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      avatar: "AJ"
    },
    {
      id: 7,
      name: "Rachel Green",
      skill: "Digital Marketing",
      experience: "5 years",
      rating: 4.9,
      reviews: 145,
      price: 65,
      duration: "45 minutes",
      bio: "Growth Marketing Manager at Shopify with expertise in performance marketing.",
      specialties: ["SEO", "PPC", "Analytics", "Content Strategy"],
      avatar: "RG"
    },
    {
      id: 8,
      name: "James Wilson",
      skill: "Backend Development",
      experience: "7 years",
      rating: 4.7,
      reviews: 118,
      price: 90,
      duration: "1 hour",
      bio: "Principal Engineer at Uber, specializing in distributed systems and microservices.",
      specialties: ["Node.js", "Python", "PostgreSQL", "Redis", "Microservices"],
      avatar: "JW"
    },
    {
      id: 9,
      name: "Priya Patel",
      skill: "Cybersecurity",
      experience: "8 years",
      rating: 4.8,
      reviews: 87,
      price: 125,
      duration: "1 hour",
      bio: "Security Architect at Microsoft with focus on cloud security and threat analysis.",
      specialties: ["Penetration Testing", "Cloud Security", "Risk Assessment"],
      avatar: "PP"
    },
    {
      id: 10,
      name: "Michael Brown",
      skill: "Mobile Development",
      experience: "6 years",
      rating: 4.6,
      reviews: 134,
      price: 85,
      duration: "1 hour",
      bio: "Senior iOS Developer at Apple with expertise in Swift and cross-platform development.",
      specialties: ["Swift", "React Native", "iOS", "Android"],
      avatar: "MB"
    },
    {
      id: 11,
      name: "Anna Kowalski",
      skill: "Business Strategy",
      experience: "10 years",
      rating: 4.9,
      reviews: 198,
      price: 150,
      duration: "90 minutes",
      bio: "Strategy Consultant at McKinsey with expertise in digital transformation.",
      specialties: ["Market Analysis", "Financial Modeling", "Operations"],
      avatar: "AK"
    },
    {
      id: 12,
      name: "Roberto Silva",
      skill: "Blockchain Development",
      experience: "4 years",
      rating: 4.5,
      reviews: 76,
      price: 100,
      duration: "1 hour",
      bio: "Blockchain Developer at Coinbase with focus on DeFi and smart contracts.",
      specialties: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      avatar: "RS"
    },
    {
      id: 13,
      name: "Sophie Martin",
      skill: "Content Writing",
      experience: "7 years",
      rating: 4.8,
      reviews: 223,
      price: 55,
      duration: "45 minutes",
      bio: "Content Strategist at HubSpot with expertise in B2B content marketing.",
      specialties: ["Copywriting", "SEO Writing", "Content Strategy", "Email Marketing"],
      avatar: "SM"
    },
    {
      id: 14,
      name: "Kevin Lee",
      skill: "Cloud Architecture",
      experience: "9 years",
      rating: 4.7,
      reviews: 109,
      price: 115,
      duration: "1 hour",
      bio: "Solutions Architect at Amazon Web Services specializing in enterprise migrations.",
      specialties: ["AWS", "Azure", "Cloud Migration", "Architecture Design"],
      avatar: "KL"
    },
    {
      id: 15,
      name: "Isabella Garcia",
      skill: "Sales Leadership",
      experience: "11 years",
      rating: 4.9,
      reviews: 167,
      price: 130,
      duration: "1 hour",
      bio: "VP of Sales at Salesforce with track record of building high-performing teams.",
      specialties: ["Team Building", "Sales Process", "CRM", "Negotiation"],
      avatar: "IG"
    },
    {
      id: 16,
      name: "Thomas Anderson",
      skill: "Quality Assurance",
      experience: "6 years",
      rating: 4.6,
      reviews: 94,
      price: 70,
      duration: "1 hour",
      bio: "QA Lead at Microsoft with expertise in automated testing and quality processes.",
      specialties: ["Automation Testing", "Selenium", "Test Strategy", "Agile"],
      avatar: "TA"
    },
    {
      id: 17,
      name: "Maya Sharma",
      skill: "HR Management",
      experience: "8 years",
      rating: 4.8,
      reviews: 142,
      price: 85,
      duration: "1 hour",
      bio: "Head of People at Zoom with focus on talent acquisition and employee development.",
      specialties: ["Recruitment", "Performance Management", "Culture Building"],
      avatar: "MS"
    },
    {
      id: 18,
      name: "Carlos Mendez",
      skill: "Financial Analysis",
      experience: "7 years",
      rating: 4.7,
      reviews: 128,
      price: 105,
      duration: "1 hour",
      bio: "Senior Financial Analyst at Goldman Sachs with expertise in investment analysis.",
      specialties: ["Financial Modeling", "Valuation", "Risk Analysis", "Excel"],
      avatar: "CM"
    },
    {
      id: 19,
      name: "Jennifer Liu",
      skill: "Project Management",
      experience: "9 years",
      rating: 4.8,
      reviews: 185,
      price: 95,
      duration: "1 hour",
      bio: "Senior Project Manager at Adobe with PMP certification and Agile expertise.",
      specialties: ["Scrum", "Kanban", "Risk Management", "Stakeholder Management"],
      avatar: "JL"
    },
    {
      id: 20,
      name: "Daniel Kim",
      skill: "Game Development",
      experience: "6 years",
      rating: 4.6,
      reviews: 83,
      price: 80,
      duration: "1 hour",
      bio: "Game Developer at Unity Technologies with focus on mobile and VR games.",
      specialties: ["Unity", "C#", "3D Modeling", "Game Design"],
      avatar: "DK"
    },
    {
      id: 21,
      name: "Olivia Taylor",
      skill: "Brand Strategy",
      experience: "8 years",
      rating: 4.9,
      reviews: 156,
      price: 120,
      duration: "90 minutes",
      bio: "Brand Director at Nike with expertise in brand positioning and marketing campaigns.",
      specialties: ["Brand Identity", "Market Research", "Campaign Strategy"],
      avatar: "OT"
    },
    {
      id: 22,
      name: "Hassan Ali",
      skill: "System Administration",
      experience: "10 years",
      rating: 4.5,
      reviews: 67,
      price: 75,
      duration: "1 hour",
      bio: "Senior SysAdmin at Red Hat with expertise in Linux systems and automation.",
      specialties: ["Linux", "Bash", "Network Security", "Server Management"],
      avatar: "HA"
    },
    {
      id: 23,
      name: "Grace Zhou",
      skill: "E-commerce Strategy",
      experience: "7 years",
      rating: 4.8,
      reviews: 194,
      price: 100,
      duration: "1 hour",
      bio: "E-commerce Director at Shopify Plus with focus on conversion optimization.",
      specialties: ["Conversion Rate Optimization", "A/B Testing", "Analytics"],
      avatar: "GZ"
    },
    {
      id: 24,
      name: "Nathan Parker",
      skill: "Technical Writing",
      experience: "5 years",
      rating: 4.7,
      reviews: 112,
      price: 60,
      duration: "45 minutes",
      bio: "Technical Writer at Atlassian specializing in developer documentation.",
      specialties: ["API Documentation", "User Guides", "Technical Communication"],
      avatar: "NP"
    },
    {
      id: 25,
      name: "Victoria Jones",
      skill: "Social Media Marketing",
      experience: "6 years",
      rating: 4.8,
      reviews: 178,
      price: 70,
      duration: "1 hour",
      bio: "Social Media Manager at Instagram with expertise in influencer marketing.",
      specialties: ["Instagram Marketing", "TikTok", "Influencer Relations", "Analytics"],
      avatar: "VJ"
    },
    {
      id: 26,
      name: "Ahmed Hassan",
      skill: "Network Engineering",
      experience: "9 years",
      rating: 4.6,
      reviews: 89,
      price: 90,
      duration: "1 hour",
      bio: "Network Engineer at Cisco with expertise in enterprise networking solutions.",
      specialties: ["Network Design", "Routing", "Switching", "Network Security"],
      avatar: "AH"
    },
    {
      id: 27,
      name: "Catherine White",
      skill: "Operations Management",
      experience: "11 years",
      rating: 4.9,
      reviews: 145,
      price: 110,
      duration: "1 hour",
      bio: "VP of Operations at Tesla with focus on supply chain optimization.",
      specialties: ["Supply Chain", "Process Improvement", "Lean Manufacturing"],
      avatar: "CW"
    },
    {
      id: 28,
      name: "Ryan O'Connor",
      skill: "Video Production",
      experience: "8 years",
      rating: 4.7,
      reviews: 124,
      price: 85,
      duration: "1 hour",
      bio: "Video Producer at Netflix with expertise in post-production and editing.",
      specialties: ["Video Editing", "Motion Graphics", "Color Grading", "Audio"],
      avatar: "RO"
    },
    {
      id: 29,
      name: "Fatima Al-Zahra",
      skill: "Legal Consulting",
      experience: "12 years",
      rating: 4.8,
      reviews: 98,
      price: 200,
      duration: "1 hour",
      bio: "Corporate Lawyer at Baker McKenzie specializing in tech and startup law.",
      specialties: ["Contract Law", "IP Protection", "Startup Legal", "Compliance"],
      avatar: "FA"
    },
    {
      id: 30,
      name: "Lucas Schmidt",
      skill: "Data Engineering",
      experience: "6 years",
      rating: 4.6,
      reviews: 76,
      price: 95,
      duration: "1 hour",
      bio: "Data Engineer at Spotify with expertise in big data processing and pipelines.",
      specialties: ["Apache Spark", "Kafka", "ETL", "Data Warehousing", "Python"],
      avatar: "LS"
    }
  ];

  const skills = ['All', ...new Set(mentors.map(mentor => mentor.skill))];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = selectedSkill === 'All' || mentor.skill === selectedSkill;
    return matchesSearch && matchesSkill;
  });

  const handleGetMentor = (mentorName) => {
    // Optionally, pass mentor info via state or params
    navigate("/payment", { state: { mentorName } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: { xs: 2, md: 4 } }}>

        <Container maxWidth="xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                fontWeight="bold"
                color="#2c3e50"
                mb={2}
              >
                Find Your Perfect Mentor
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
                mb={4}
              >
                Connect with industry experts and accelerate your career growth
              </Typography>

              {/* Search and Filter */}
              <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                gap={2}
                maxWidth="600px"
                mx="auto"
                mb={4}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search mentors or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 1 }}
                />

                <FormControl sx={{ minWidth: { xs: '100%', md: 200 } }}>
                  <InputLabel>Filter by Skill</InputLabel>
                  <Select
                    value={selectedSkill}
                    label="Filter by Skill"
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterList color="action" />
                      </InputAdornment>
                    }
                  >
                    {skills.map(skill => (
                      <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Showing {filteredMentors.length} of {mentors.length} mentors
            </Typography>
          </motion.div>

          {/* Mentors Grid */}
          <AnimatePresence>
            {filteredMentors.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {filteredMentors.map((mentor) => (
                    <Grid item xs={12} sm={6} lg={4} key={mentor.id}>
                      <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        layout
                      >
                        <Card
                          elevation={2}
                          sx={{
                            height: '480px', // Fixed height for uniformity
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              elevation: 8,
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          <CardContent sx={{ 
                            flexGrow: 1, 
                            p: { xs: 2, md: 3 },
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                          }}>
                            {/* Mentor Header */}
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                              <Avatar
                                sx={{
                                  width: { xs: 50, md: 60 },
                                  height: { xs: 50, md: 60 },
                                  bgcolor: '#2ecc71',
                                  fontSize: { xs: '1rem', md: '1.2rem' },
                                  fontWeight: 'bold'
                                }}
                              >
                                {mentor.avatar}
                              </Avatar>
                              <Box flex={1}>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color="#2c3e50"
                                  fontSize={{ xs: '1.1rem', md: '1.25rem' }}
                                  sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {mentor.name}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ 
                                    color: '#2ecc71', 
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {mentor.skill}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                  <Rating
                                    value={mentor.rating}
                                    precision={0.1}
                                    size="small"
                                    readOnly
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    {mentor.rating} ({mentor.reviews})
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* Bio - Fixed height container */}
                            <Box
                              sx={{
                                height: '60px', // Fixed height for bio
                                overflow: 'hidden',
                                mb: 2
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  lineHeight: 1.5,
                                  fontSize: { xs: '0.875rem', md: '0.875rem' },
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {mentor.bio}
                              </Typography>
                            </Box>

                            {/* Specialties - Fixed height container */}
                            <Box sx={{ height: '50px', mb: 2, overflow: 'hidden' }}>
                              <Box display="flex" flexWrap="wrap" gap={1}>
                                {mentor.specialties.slice(0, 4).map((specialty, index) => (
                                  <Chip
                                    key={index}
                                    label={specialty}
                                    size="small"
                                    sx={{
                                      bgcolor: '#e8f5e8',
                                      color: '#2ecc71',
                                      fontWeight: 500,
                                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                                    }}
                                  />
                                ))}
                                {mentor.specialties.length > 4 && (
                                  <Chip
                                    label={`+${mentor.specialties.length - 4}`}
                                    size="small"
                                    sx={{
                                      bgcolor: '#f5f5f5',
                                      color: '#666',
                                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>

                            {/* Spacer to push pricing and button to bottom */}
                            <Box sx={{ flexGrow: 1 }} />

                            {/* Pricing and Details */}
                            <Paper
                              elevation={0}
                              sx={{
                                bgcolor: '#f8f9fa',
                                p: 2,
                                mb: 2,
                                borderRadius: 2
                              }}
                            >
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4}>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <AttachMoney sx={{ color: '#2ecc71', fontSize: '1.2rem' }} />
                                    <Typography
                                      variant="h6"
                                      fontWeight="bold"
                                      sx={{ color: '#2ecc71', fontSize: { xs: '1rem', md: '1.1rem' } }}
                                    >
                                      ${mentor.price}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <AccessTime color="action" sx={{ fontSize: '1.1rem' }} />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      fontSize={{ xs: '0.75rem', md: '0.875rem' }}
                                    >
                                      {mentor.duration}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={4}>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <Person color="action" sx={{ fontSize: '1.1rem' }} />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      fontSize={{ xs: '0.75rem', md: '0.875rem' }}
                                    >
                                      {mentor.experience}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Paper>

                            {/* Get Mentor Button */}
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => handleGetMentor(mentor.name)}
                                sx={{
                                  bgcolor: '#2ecc71',
                                  color: 'white',
                                  fontWeight: 600,
                                  py: { xs: 1.5, md: 1.5 },
                                  fontSize: { xs: '0.9rem', md: '1rem' },
                                  textTransform: 'none',
                                  borderRadius: 2,
                                  '&:hover': {
                                    bgcolor: '#27ae60',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)'
                                  }
                                }}
                              >
                                Get Mentor
                              </Button>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box textAlign="center" py={8}>
                  <Search sx={{ fontSize: 64, color: '#bbb', mb: 2 }} />
                  <Typography variant="h5" color="text.secondary" mb={1}>
                    No mentors found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your search criteria or filters
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default MentorListing;