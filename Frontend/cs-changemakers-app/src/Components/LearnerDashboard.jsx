import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Paper,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Drawer,
  useTheme,
  useMediaQuery,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Stack,
  Container,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  Assignment as ProjectIcon,
  Payment as PaymentIcon,
  Notifications as NotificationIcon,
  Menu as MenuIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as TimeIcon,
  Business as BusinessIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  Launch as LaunchIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  BookmarkBorder as BookmarkIcon,
  Language as LanguageIcon,
  Speed as SpeedIcon,
  LocalFireDepartment as FireIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced theme with better color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ecc71",
      light: "#58d68d",
      dark: "#27ae60",
    },
    secondary: {
      main: "#e74c3c",
      light: "#ec7063",
      dark: "#c0392b",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          border: "1px solid #e2e8f0",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
  },
});

const drawerWidth = 280;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

function LearnerDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("md", "lg"));

  // Enhanced Mock data
  const learnerData = {
    name: "Tayo Mbah",
    avatar: "/api/placeholder/64/64",
    level: "Intermediate",
    points: 2450,
    completedCourses: 8,
    activeProjects: 3,
    mentorshipSessions: 12,
    streak: 7,
    rank: "Top 15%",
  };

  const skills = [
    { name: "JavaScript", level: 85, category: "Programming", growth: "+12%" },
    { name: "React", level: 70, category: "Frontend", growth: "+8%" },
    { name: "Node.js", level: 60, category: "Backend", growth: "+15%" },
    { name: "Project Management", level: 45, category: "Soft Skills", growth: "+5%" },
    { name: "Python", level: 30, category: "Programming", growth: "+20%" },
  ];

  const courses = [
    {
      title: "Advanced React Development",
      progress: 75,
      instructor: "John Doe",
      price: 45000,
      duration: "12 hours",
      students: 1250,
      rating: 4.8,
    },
    {
      title: "Full Stack JavaScript",
      progress: 45,
      instructor: "Jane Smith",
      price: 65000,
      duration: "20 hours",
      students: 980,
      rating: 4.9,
    },
    {
      title: "Startup Fundamentals",
      progress: 90,
      instructor: "Mike Johnson",
      price: 35000,
      duration: "8 hours",
      students: 2100,
      rating: 4.7,
    },
    {
      title: "UI/UX Design Principles",
      progress: 0,
      instructor: "Sarah Chen",
      price: 55000,
      duration: "15 hours",
      students: 750,
      rating: 4.6,
    },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      status: "In Progress",
      team: 4,
      deadline: "2 weeks",
      description: "Building a modern e-commerce solution with React and Node.js",
      progress: 65,
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Mobile Banking App",
      status: "Completed",
      team: 3,
      deadline: "Finished",
      description: "Developed a secure mobile banking application",
      progress: 100,
      tech: ["React Native", "Firebase"],
    },
    {
      title: "Educational Platform",
      status: "Starting Soon",
      team: 5,
      deadline: "1 month",
      description: "Creating an interactive learning management system",
      progress: 0,
      tech: ["Vue.js", "Django", "PostgreSQL"],
    },
  ];

  const mentors = [
    {
      name: "Sarah Williams",
      expertise: "Software Engineering",
      rating: 4.9,
      sessions: 5,
      avatar: "/api/placeholder/50/50",
      price: "15,000 XAF/hour",
      specialties: ["React", "System Design"],
    },
    {
      name: "David Chen",
      expertise: "Product Management",
      rating: 4.8,
      sessions: 3,
      avatar: "/api/placeholder/50/50",
      price: "18,000 XAF/hour",
      specialties: ["Strategy", "Analytics"],
    },
    {
      name: "Emma Wilson",
      expertise: "UI/UX Design",
      rating: 4.7,
      sessions: 4,
      avatar: "/api/placeholder/50/50",
      price: "12,000 XAF/hour",
      specialties: ["Figma", "User Research"],
    },
  ];

  const internships = [
    {
      title: "Junior Developer Internship",
      company: "TechStart Inc.",
      location: "Douala",
      status: "Applied",
      appliedDate: "2024-01-15",
      duration: "3 months",
      salary: "150,000 XAF/month",
      skills: ["JavaScript", "React"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Digital Solutions",
      location: "Yaoundé",
      status: "Interview Scheduled",
      appliedDate: "2024-01-10",
      duration: "6 months",
      salary: "200,000 XAF/month",
      skills: ["Vue.js", "CSS"],
    },
    {
      title: "Software Development Intern",
      company: "NGO Connect",
      location: "Remote",
      status: "Under Review",
      appliedDate: "2024-01-20",
      duration: "4 months",
      salary: "180,000 XAF/month",
      skills: ["Python", "Django"],
    },
  ];

  const EnhancedStatCard = ({ title, value, icon, color = "primary", subtitle, trend }) => (
    <motion.div variants={itemVariants} whileHover={cardHover}>
      <Card sx={{ height: "100%", position: "relative", overflow: "visible" }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Avatar 
              sx={{ 
                bgcolor: `${color}.main`, 
                width: 56, 
                height: 56,
                boxShadow: 3,
              }}
            >
              {icon}
            </Avatar>
            {trend && (
              <Chip 
                label={trend} 
                size="small" 
                color="success" 
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
          <Typography variant="h3" color={`${color}.main`} fontWeight="bold" mb={1}>
            {value}
          </Typography>
          <Typography color="text.primary" variant="h6" fontWeight={500} mb={0.5}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const sidebarItems = [
    { id: "dashboard", text: "Dashboard", icon: <DashboardIcon /> },
    { id: "profile", text: "My Profile", icon: <PersonIcon /> },
    { id: "courses", text: "Learning Hub", icon: <SchoolIcon /> },
    { id: "projects", text: "Projects", icon: <ProjectIcon /> },
    { id: "mentorship", text: "Mentorship", icon: <GroupIcon /> },
    { id: "internships", text: "Internship Tracker", icon: <WorkIcon /> },
    { id: "payments", text: "Payments", icon: <PaymentIcon /> },
  ];

  const drawer = (
    <Box sx={{ height: "100%", overflow: "auto", bgcolor: "background.paper" }}>
      <Toolbar />
      <Box sx={{ p: 3 }}>
        {/* User Info in Sidebar */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Avatar 
            src={learnerData.avatar} 
            sx={{ width: 64, height: 64, mx: "auto", mb: 2, border: "3px solid", borderColor: "primary.main" }}
          />
          <Typography variant="h6" fontWeight={600}>
            {learnerData.name.split(" ")[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {learnerData.level}
          </Typography>
          <Chip 
            label={`${learnerData.points} pts`} 
            color="primary" 
            size="small" 
            sx={{ mt: 1 }}
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <List disablePadding>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                backgroundColor: activeSection === item.id ? "primary.light" : "transparent",
                "&:hover": {
                  backgroundColor: activeSection === item.id ? "primary.light" : "grey.100",
                },
                borderRadius: 2,
                mb: 1,
                border: activeSection === item.id ? "2px solid" : "2px solid transparent",
                borderColor: activeSection === item.id ? "primary.main" : "transparent",
                transition: "all 0.3s ease",
                px: 2,
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeSection === item.id ? "primary.dark" : "text.secondary",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: activeSection === item.id ? "primary.dark" : "text.primary",
                  "& .MuiListItemText-primary": {
                    fontWeight: activeSection === item.id ? 600 : 400,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Welcome back, {learnerData.name}! 👋
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  Continue your learning journey and track your progress
                </Typography>
              </Box>

              {/* Enhanced Stats Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} lg={3}>
                  <EnhancedStatCard
                    title="Total Points"
                    value={learnerData.points.toLocaleString()}
                    icon={<TrophyIcon />}
                    color="primary"
                    subtitle={learnerData.rank}
                    trend="+12%"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <EnhancedStatCard
                    title="Courses Completed"
                    value={learnerData.completedCourses}
                    icon={<SchoolIcon />}
                    color="secondary"
                    subtitle="This month: 2"
                    trend="+25%"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <EnhancedStatCard
                    title="Active Projects"
                    value={learnerData.activeProjects}
                    icon={<ProjectIcon />}
                    color="primary"
                    subtitle="In collaboration"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <EnhancedStatCard
                    title="Learning Streak"
                    value={`${learnerData.streak} days`}
                    icon={<FireIcon />}
                    color="secondary"
                    subtitle="Keep it up!"
                    trend="🔥"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Quick Actions - Enhanced */}
                <Grid item xs={12} lg={6}>
                  <motion.div variants={itemVariants}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" mb={3}>
                          <SpeedIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6" fontWeight={600}>
                            Quick Actions
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<SchoolIcon />}
                              onClick={() => setActiveSection("courses")}
                              sx={{ py: 1.5, flexDirection: isMobile ? "column" : "row" }}
                            >
                              Browse Courses
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<ProjectIcon />}
                              onClick={() => setActiveSection("projects")}
                              sx={{ py: 1.5, flexDirection: isMobile ? "column" : "row" }}
                            >
                              View Projects
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<GroupIcon />}
                              onClick={() => setActiveSection("mentorship")}
                              sx={{ py: 1.5, flexDirection: isMobile ? "column" : "row" }}
                            >
                              Get Mentorship
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="contained"
                              startIcon={<WorkIcon />}
                              onClick={() => setActiveSection("internships")}
                              sx={{ py: 1.5, flexDirection: isMobile ? "column" : "row" }}
                            >
                              Find Internships
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                {/* Skill Progress - Enhanced */}
                <Grid item xs={12} lg={6}>
                  <motion.div variants={itemVariants}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" justify="space-between" mb={3}>
                          <Box display="flex" alignItems="center">
                            <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6" fontWeight={600}>
                              Skill Progress
                            </Typography>
                          </Box>
                          <Button size="small" endIcon={<ArrowForwardIcon />}>
                            View All
                          </Button>
                        </Box>
                        {skills.slice(0, 4).map((skill, index) => (
                          <Box key={index} sx={{ mb: 3 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                              <Typography variant="body1" fontWeight={500}>
                                {skill.name}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Chip 
                                  label={skill.growth} 
                                  size="small" 
                                  color="success" 
                                  variant="outlined"
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  {skill.level}%
                                </Typography>
                              </Box>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={skill.level}
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                bgcolor: "grey.200",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 4,
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>

              {/* Recent Activity - Enhanced */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <TimelineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight={600}>
                        Recent Activity
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {[
                        {
                          icon: <TrophyIcon />,
                          title: "Course Completed",
                          desc: "Advanced React Development - Earned 250 points!",
                          time: "2 hours ago",
                          color: "primary",
                        },
                        {
                          icon: <WorkIcon />,
                          title: "Internship Applied",
                          desc: "Junior Developer at TechStart Inc.",
                          time: "1 day ago",
                          color: "secondary",
                        },
                        {
                          icon: <GroupIcon />,
                          title: "Mentorship Session",
                          desc: "Software Engineering with Sarah Williams",
                          time: "3 days ago",
                          color: "primary",
                        },
                      ].map((activity, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <Paper sx={{ p: 2, border: "1px solid", borderColor: "grey.200" }}>
                            <Box display="flex" alignItems="start" gap={2}>
                              <Avatar sx={{ bgcolor: `${activity.color}.main`, width: 40, height: 40 }}>
                                {activity.icon}
                              </Avatar>
                              <Box flex={1}>
                                <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                                  {activity.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                  {activity.desc}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.time}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Container>
          </motion.div>
        );

      case "courses":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Learning Hub
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover and continue your learning journey
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {courses.map((course, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <motion.div variants={itemVariants} whileHover={cardHover}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" justify="space-between" alignItems="start" mb={2}>
                            <BookmarkIcon color="action" />
                            <Chip 
                              label={course.progress === 0 ? "New" : `${course.progress}%`} 
                              color={course.progress === 100 ? "success" : "primary"}
                              size="small"
                            />
                          </Box>
                          
                          <Typography variant="h6" fontWeight={600} mb={1}>
                            {course.title}
                          </Typography>
                          <Typography color="text.secondary" mb={2} variant="body2">
                            by {course.instructor}
                          </Typography>
                          
                          {course.progress > 0 && (
                            <Box sx={{ mb: 2 }}>
                              <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{ height: 6, borderRadius: 3, mb: 1 }}
                              />
                            </Box>
                          )}
                          
                          <Box display="flex" justify="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <StarIcon color="warning" sx={{ fontSize: 16 }} />
                              <Typography variant="body2">{course.rating}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {course.duration}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            {course.students.toLocaleString()} students
                          </Typography>
                          
                          <Box display="flex" justify="space-between" alignItems="center">
                            <Typography variant="h6" color="secondary.main" fontWeight={600}>
                              {course.price.toLocaleString()} XAF
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button 
                            fullWidth 
                            variant={course.progress > 0 ? "contained" : "outlined"}
                            startIcon={course.progress > 0 ? <PlayArrowIcon /> : <SchoolIcon />}
                          >
                            {course.progress === 0 ? "Enroll Now" : course.progress === 100 ? "Review" : "Continue"}
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </motion.div>
        );

      case "projects":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Project Workspace
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Collaborate on real-world projects and build your portfolio
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {projects.map((project, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <motion.div variants={itemVariants} whileHover={cardHover}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" justify="space-between" alignItems="start" mb={2}>
                            <Typography variant="h6" fontWeight={600}>
                              {project.title}
                            </Typography>
                            <Chip
                              label={project.status}
                              color={
                                project.status === "Completed" ? "success" :
                                project.status === "In Progress" ? "primary" : "default"
                              }
                              size="small"
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" mb={3}>
                            {project.description}
                          </Typography>
                          
                          {project.progress > 0 && (
                            <Box mb={2}>
                              <Box display="flex" justify="space-between" mb={1}>
                                <Typography variant="body2">Progress</Typography>
                                <Typography variant="body2">{project.progress}%</Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={project.progress}
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          )}
                          
                          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                            {project.tech?.map((tech, idx) => (
                              <Chip key={idx} label={tech} size="small" variant="outlined" />
                            ))}
                          </Box>
                          
                          <Box display="flex" justify="space-between" alignItems="center" mb={2}>
                            <Typography variant="body2" color="text.secondary">
                              👥 {project.team} members
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ⏰ {project.deadline}
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button startIcon={<LaunchIcon />} variant="outlined">
                            View Project
                          </Button>
                          <Button variant="contained">
                            Collaborate
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </motion.div>
        );

      case "mentorship":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Mentorship Program
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Connect with industry experts and accelerate your growth
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {mentors.map((mentor, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <motion.div variants={itemVariants} whileHover={cardHover}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={3}>
                            <Avatar 
                              src={mentor.avatar}
                              sx={{ width: 60, height: 60, mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6" fontWeight={600}>
                                {mentor.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {mentor.expertise}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box display="flex" alignItems="center" mb={2}>
                            <StarIcon color="warning" sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2" mr={2}>{mentor.rating}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {mentor.sessions} sessions completed
                            </Typography>
                          </Box>
                          
                          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                            {mentor.specialties.map((specialty, idx) => (
                              <Chip key={idx} label={specialty} size="small" variant="outlined" />
                            ))}
                          </Box>
                          
                          <Typography variant="h6" color="secondary.main" fontWeight={600} mb={2}>
                            {mentor.price}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button fullWidth variant="outlined" startIcon={<GroupIcon />}>
                            Book Session
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </motion.div>
        );

      case "internships":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Internship Tracker
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track your internship applications and discover new opportunities
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {internships.map((internship, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <motion.div variants={itemVariants} whileHover={cardHover}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" justify="space-between" alignItems="start" mb={2}>
                            <Typography variant="h6" fontWeight={600}>
                              {internship.title}
                            </Typography>
                            <Chip
                              label={internship.status}
                              color={
                                internship.status === "Applied" ? "primary" :
                                internship.status === "Interview Scheduled" ? "warning" : "default"
                              }
                              size="small"
                            />
                          </Box>
                          
                          <Box display="flex" alignItems="center" mb={2}>
                            <BusinessIcon sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                            <Typography variant="body2" color="text.secondary">
                              {internship.company}
                            </Typography>
                          </Box>
                          
                          <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="body2" color="text.secondary" mr={2}>
                              📍 {internship.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ⏱️ {internship.duration}
                            </Typography>
                          </Box>
                          
                          <Typography variant="h6" color="secondary.main" fontWeight={600} mb={2}>
                            {internship.salary}
                          </Typography>
                          
                          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                            {internship.skills.map((skill, idx) => (
                              <Chip key={idx} label={skill} size="small" variant="outlined" />
                            ))}
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary">
                            Applied: {new Date(internship.appliedDate).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0 }}>
                          <Button startIcon={<LaunchIcon />} variant="outlined">
                            View Details
                          </Button>
                          <Button variant="contained">
                            Follow Up
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </motion.div>
        );

      case "payments":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  Payment Center
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your payments and billing information
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>
                        Payment History
                      </Typography>
                      <List>
                        {[
                          { course: "Advanced React Development", amount: "45,000 XAF", date: "Jan 15, 2024", status: "Completed" },
                          { course: "Full Stack JavaScript", amount: "65,000 XAF", date: "Jan 10, 2024", status: "Completed" },
                          { course: "Mentorship Session", amount: "15,000 XAF", date: "Jan 8, 2024", status: "Completed" },
                        ].map((payment, index) => (
                          <ListItem key={index} divider>
                            <ListItemText
                              primary={payment.course}
                              secondary={`${payment.date} • ${payment.amount}`}
                            />
                            <Chip label={payment.status} color="success" size="small" />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>
                        Quick Payment
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<PaymentIcon />}
                        onClick={() => setPaymentDialog(true)}
                        sx={{ mb: 2 }}
                      >
                        Add Payment Method
                      </Button>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        Secure payments powered by trusted providers
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Container maxWidth="xl" disableGutters>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                  My Profile
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your profile and account settings
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Avatar 
                        src={learnerData.avatar}
                        sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                      />
                      <Typography variant="h5" fontWeight={600} mb={1}>
                        {learnerData.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={2}>
                        {learnerData.level} Learner
                      </Typography>
                      <Chip label={`${learnerData.points} Points`} color="primary" />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>
                        Profile Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            defaultValue={learnerData.name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            defaultValue="tayo.mbah@example.com"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone"
                            defaultValue="+237 6XX XXX XXX"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Location"
                            defaultValue="Douala, Cameroon"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Bio"
                            defaultValue="Passionate learner focused on software development and entrepreneurship."
                            multiline
                            rows={4}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Box mt={3}>
                        <Button variant="contained" sx={{ mr: 2 }}>
                          Save Changes
                        </Button>
                        <Button variant="outlined">
                          Cancel
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Enhanced App Bar */}
        <AppBar
          position="fixed"
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "white",
            color: "text.primary",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            borderBottom: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: "primary.main" }}>
              TalentForge Academy
            </Typography>
            <Badge badgeContent={3} color="error">
              <IconButton>
                <NotificationIcon />
              </IconButton>
            </Badge>
          </Toolbar>
        </AppBar>

        {/* Enhanced Sidebar */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": { 
                boxSizing: "border-box", 
                width: drawerWidth,
                borderRight: "1px solid",
                borderColor: "grey.200",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: "64px",
          }}
        >
          {renderContent()}
        </Box>

        {/* Payment Dialog */}
        <Dialog 
          open={paymentDialog} 
          onClose={() => setPaymentDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Choose your preferred payment method
            </Typography>
            <Stack spacing={2}>
              <Button variant="outlined" fullWidth startIcon={<PaymentIcon />}>
                Mobile Money (MTN/Orange)
              </Button>
              <Button variant="outlined" fullWidth startIcon={<PaymentIcon />}>
                Bank Transfer
              </Button>
              <Button variant="outlined" fullWidth startIcon={<PaymentIcon />}>
                Credit/Debit Card
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
            <Button variant="contained">Continue</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default LearnerDashboard;