import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  LinearProgress, 
  Chip, 
  Avatar, 
  Grid, 
  Box, 
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  EmojiEvents as GoalIcon,
  CalendarToday as CalendarIcon,
  BarChart as ReportIcon,
  Person as UserIcon,
  Edit as EditIcon,
  AccessTime as ClockIcon,
  Star as AwardIcon,
  School as SchoolIcon,
  Group as MentorIcon,
  Assignment as ProjectIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from "@mui/icons-material";

const theme = {
  primary: "#2ecc71",
  secondary: "#e74c3c",
  background: "#f8fafc",
  cardBg: "#ffffff",
  textPrimary: "#2d3748",
  textSecondary: "#718096",
  sidebarBg: "#ffffff",
  sidebarHover: "#f0f9ff"
};

const drawerWidth = 280;

function LearningDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [goalDialog, setGoalDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Learning data
  const [weeklyGoal, setWeeklyGoal] = useState({
    title: "Master React Fundamentals",
    targetHours: 20,
    category: "Frontend Development"
  });

  const [dailyProgress, setDailyProgress] = useState([
    { day: "Mon", hours: 3, task: "Learned React hooks", completed: true },
    { day: "Tue", hours: 4, task: "Built todo app", completed: true },
    { day: "Wed", hours: 2.5, task: "Studied state management", completed: true },
    { day: "Thu", hours: 3.5, task: "Practiced components", completed: true },
    { day: "Fri", hours: 2, task: "Worked on project", completed: true },
    { day: "Sat", hours: 4, task: "Code review session", completed: true },
    { day: "Sun", hours: 1, task: "Planning next week", completed: false }
  ]);

  const [newGoal, setNewGoal] = useState({ title: "", targetHours: 10, category: "" });
  const [editDay, setEditDay] = useState({ hours: 0, task: "", completed: false });

  // Menu items - easily expandable
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, active: true },
    { id: "goals", label: "Weekly Goals", icon: <GoalIcon />, active: true },
    { id: "progress", label: "Daily Progress", icon: <CalendarIcon />, active: true },
    { id: "reports", label: "Reports", icon: <ReportIcon />, active: true },
    { id: "mentors", label: "Mentors", icon: <MentorIcon />, active: false },
    { id: "projects", label: "Projects", icon: <ProjectIcon />, active: false },
    { id: "courses", label: "Courses", icon: <SchoolIcon />, active: false },
    { id: "settings", label: "Settings", icon: <SettingsIcon />, active: false }
  ];

  // User data
  const userData = {
    name: "Tayo Mbah",
    email: "tayo@example.com",
    avatar: "https://via.placeholder.com/60",
    level: "Intermediate",
    points: 2450
  };

  // Calculations
  const totalHours = dailyProgress.reduce((sum, day) => sum + day.hours, 0);
  const completedDays = dailyProgress.filter(day => day.completed).length;
  const progressPercent = Math.round((totalHours / weeklyGoal.targetHours) * 100);

  // Chart components
  const SimpleBarChart = ({ data }) => {
    const maxHours = Math.max(...data.map(d => d.hours));
    return (
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="end" gap={1} height={150} mb={2}>
          {data.map((day, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center" flex={1}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 40,
                  height: `${(day.hours / maxHours) * 120}px`,
                  bgcolor: theme.primary,
                  borderRadius: 1,
                  mb: 1,
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  p: 0.5
                }}
              >
                {day.hours}h
              </Box>
              <Typography variant="caption">{day.day}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const SimpleLineChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.cumulative));
    return (
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="end" gap={2} height={150} mb={2}>
          {data.map((point, index) => (
            <Box key={index} display="flex" flexDirection="column" alignItems="center" flex={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: theme.primary,
                  borderRadius: "50%",
                  mb: `${150 - (point.cumulative / maxValue) * 120}px`,
                  position: "relative"
                }}
              />
              <Typography variant="caption">{point.day}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const StatCard = ({ title, value, icon, color = theme.primary }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3, textAlign: "center" }}>
        <Box sx={{ color, mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h4" sx={{ color, fontWeight: "bold", mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  const handleSaveGoal = () => {
    setWeeklyGoal(newGoal);
    setGoalDialog(false);
    setNewGoal({ title: "", targetHours: 10, category: "" });
  };

  const handleEditDay = (dayIndex) => {
    const day = dailyProgress[dayIndex];
    setSelectedDay(dayIndex);
    setEditDay({ hours: day.hours, task: day.task, completed: day.completed });
    setEditDialog(true);
  };

  const handleSaveDay = () => {
    const updated = [...dailyProgress];
    updated[selectedDay] = { ...updated[selectedDay], ...editDay };
    setDailyProgress(updated);
    setEditDialog(false);
  };

  // Sidebar content
  const drawer = (
    <Box sx={{ height: "100%", bgcolor: theme.sidebarBg }}>
      {/* User Profile Section */}
      <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            src={userData.avatar} 
            sx={{ width: 48, height: 48, bgcolor: theme.primary }}
          >
            {userData.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="600" sx={{ fontSize: "1rem" }}>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.level}
            </Typography>
            <Chip 
              label={`${userData.points} pts`} 
              size="small" 
              sx={{ 
                bgcolor: theme.primary, 
                color: "white", 
                fontSize: "0.75rem",
                height: 20,
                mt: 0.5
              }} 
            />
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ p: 2 }}>
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              button
              onClick={() => {
                if (item.active) {
                  setActiveSection(item.id);
                  if (isMobile) setMobileOpen(false);
                }
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: activeSection === item.id ? theme.primary : "transparent",
                color: activeSection === item.id ? "white" : theme.textPrimary,
                opacity: item.active ? 1 : 0.5,
                cursor: item.active ? "pointer" : "not-allowed",
                "&:hover": {
                  bgcolor: item.active 
                    ? (activeSection === item.id ? theme.primary : theme.sidebarHover)
                    : "transparent"
                },
                transition: "all 0.2s ease"
              }}
            >
              <ListItemIcon sx={{ 
                color: activeSection === item.id ? "white" : theme.textSecondary,
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.95rem",
                    fontWeight: activeSection === item.id ? 600 : 400
                  }
                }}
              />
              {!item.active && (
                <Typography variant="caption" sx={{ 
                  bgcolor: "rgba(0,0,0,0.1)", 
                  px: 1, 
                  py: 0.25, 
                  borderRadius: 1,
                  fontSize: "0.7rem"
                }}>
                  Soon
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: "auto", p: 3, borderTop: "1px solid #e5e7eb" }}>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Learning Progress Tracker v1.0
        </Typography>
      </Box>
    </Box>
  );

  // Main content renderer
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: theme.primary }}>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Welcome back! Here's your learning overview
            </Typography>

            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Total Hours" 
                  value={`${totalHours}h`} 
                  icon={<ClockIcon sx={{ fontSize: 32 }} />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Completed Days" 
                  value={completedDays} 
                  icon={<AwardIcon sx={{ fontSize: 32 }} />}
                  color={theme.secondary}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Goal Progress" 
                  value={`${progressPercent}%`} 
                  icon={<GoalIcon sx={{ fontSize: 32 }} />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Points" 
                  value={userData.points} 
                  icon={<AwardIcon sx={{ fontSize: 32 }} />}
                  color={theme.secondary}
                />
              </Grid>
            </Grid>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Current Weekly Goal
                </Typography>
                <Typography variant="h5" fontWeight="600" mb={1}>
                  {weeklyGoal.title}
                </Typography>
                <Chip label={weeklyGoal.category} sx={{ mb: 2, bgcolor: theme.primary, color: "white" }} />
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(progressPercent, 100)}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: "grey.200",
                    "& .MuiLinearProgress-bar": { bgcolor: theme.primary }
                  }}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {totalHours}h of {weeklyGoal.targetHours}h completed ({progressPercent}%)
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );

      case "goals":
        return (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: theme.primary }}>
                  Weekly Goals
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Set and track your weekly learning objectives
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => {
                  setNewGoal(weeklyGoal);
                  setGoalDialog(true);
                }}
                sx={{ bgcolor: theme.primary }}
              >
                Edit Goal
              </Button>
            </Box>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={1}>
                  {weeklyGoal.title}
                </Typography>
                <Chip label={weeklyGoal.category} sx={{ mb: 3, bgcolor: theme.primary, color: "white" }} />
                
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" fontWeight="600">
                      {totalHours}h / {weeklyGoal.targetHours}h ({progressPercent}%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(progressPercent, 100)}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: "grey.200",
                      "& .MuiLinearProgress-bar": { bgcolor: theme.primary }
                    }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: theme.background }}>
                      <Typography variant="h5" sx={{ color: theme.primary, fontWeight: "bold" }}>
                        {completedDays}
                      </Typography>
                      <Typography variant="body2">Days Completed</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: "center", bgcolor: theme.background }}>
                      <Typography variant="h5" sx={{ color: theme.secondary, fontWeight: "bold" }}>
                        {7 - completedDays}
                      </Typography>
                      <Typography variant="body2">Days Remaining</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      case "progress":
        return (
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: theme.primary }}>
              Daily Progress
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Track your daily learning hours and achievements
            </Typography>
            
            <Grid container spacing={2}>
              {dailyProgress.map((day, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: day.completed ? theme.primary : theme.secondary
                            }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight="600">
                              {day.day} - {day.hours}h
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {day.task}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton size="small" onClick={() => handleEditDay(index)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case "reports":
        return (
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: theme.primary }}>
              Weekly Reports
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Analyze your learning progress and trends
            </Typography>
            
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" mb={2}>Daily Hours</Typography>
                    <SimpleBarChart data={dailyProgress} />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" mb={2}>Progress Trend</Typography>
                    <SimpleLineChart data={dailyProgress.map((day, i) => ({
                      ...day,
                      cumulative: dailyProgress.slice(0, i + 1).reduce((sum, d) => sum + d.hours, 0)
                    }))} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <StatCard 
                  title="Total Hours" 
                  value={`${totalHours}h`} 
                  icon={<ClockIcon sx={{ fontSize: 32 }} />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard 
                  title="Completion Rate" 
                  value={`${Math.round((completedDays/7)*100)}%`} 
                  icon={<AwardIcon sx={{ fontSize: 32 }} />}
                  color={theme.secondary}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard 
                  title="Goal Progress" 
                  value={`${progressPercent}%`} 
                  icon={<GoalIcon sx={{ fontSize: 32 }} />}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" color="text.secondary" mb={2}>
              Coming Soon
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This feature is under development
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: theme.background }}>
      {/* App Bar for Mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "white",
          color: theme.textPrimary,
          boxShadow: 1,
          display: { md: "none" }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="600">
            Learning Progress
          </Typography>
        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
          open

        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 }
        }}
      >
        <Container maxWidth="xl" disableGutters>
          {renderContent()}
        </Container>
      </Box>

      {/* Dialogs */}
      <Dialog open={goalDialog} onClose={() => setGoalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set Weekly Goal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Category"
            value={newGoal.category}
            onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Target Hours"
            value={newGoal.targetHours}
            onChange={(e) => setNewGoal({...newGoal, targetHours: parseInt(e.target.value) || 0})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoalDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveGoal} 
            variant="contained"
            sx={{ bgcolor: theme.primary }}
          >
            Save Goal
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Daily Progress</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Hours"
            value={editDay.hours}
            onChange={(e) => setEditDay({...editDay, hours: parseFloat(e.target.value) || 0})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Task/Achievement"
            value={editDay.task}
            onChange={(e) => setEditDay({...editDay, task: e.target.value})}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveDay} 
            variant="contained"
            sx={{ bgcolor: theme.primary }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LearningDashboard;