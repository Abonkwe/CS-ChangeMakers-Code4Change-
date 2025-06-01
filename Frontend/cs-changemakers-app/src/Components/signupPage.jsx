import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Avatar,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Person,
  Email,
  Phone,
  Lock,
} from "@mui/icons-material";
import { API_BASE } from "../api"; // adjust path as needed
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create custom theme with emerald green color
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ecc71", // Emerald green
      light: "#58d68d",
      dark: "#27ae60",
    },
    secondary: {
      main: "#2ecc71",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Validation schemas
  const loginSchema = Yup.object({
    name: Yup.string()
      .required("Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signupSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, "Invalid phone number")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    //role: Yup.string().oneOf(["learner", "mentor"], "Select a valid role").required("Role is required"),
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // LOGIN HANDLER
  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        name: values.name,
        password: values.password,
        // role: "mentor", // REMOVE this line
      });
      console.log("Login response:", res.data);
      if (res.data.access_token) {
        // Save all user info to localStorage
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("user_name", res.data.name);
        localStorage.setItem("user_tel", res.data.tel);
        if (res.data.email) localStorage.setItem("user_email", res.data.email);
        if (res.data.role) localStorage.setItem("user_role", res.data.role);
        if (res.data.link) localStorage.setItem("user_link", res.data.link);

        setSuccessMsg("Login successful!");
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 800);
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.log("Login error:", err.response?.data || err.message);
    }
    setLoading(false);
    setSubmitting(false);
  };

  // SIGNUP HANDLER
  const handleSignup = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // Prepare form data for backend
      const payload = {
        name: values.name,
        tel: values.phone,
        email: values.email,
        image: "", // You can handle image upload separately if needed
        password: values.password,
        // role: values.role, // REMOVE this line if not needed
      };
      const res = await axios.post(`${API_BASE}/signup`, payload);
      console.log("Signup response:", res.data); // <-- Console log backend response
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        setSuccessMsg("Signup successful!");
        // Redirect or update UI as needed
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Signup failed. Please try again."
      );
      console.log("Signup error:", err.response?.data || err.message); // <-- Log error
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: {
            xs: "linear-gradient(135deg, #e8f5e8 0%, #d5f4e6 100%)",
            sm: "linear-gradient(135deg, #e8f5e8 0%, #d5f4e6 50%, #c8f2d4 100%)",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: { xs: "auto", sm: "80vh" },
          }}
        >
          <Card
            component={motion.div}
            variants={cardVariants}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 450, md: 500 },
              boxShadow: {
                xs: "0 4px 20px rgba(0,0,0,0.08)",
                sm: "0 8px 32px rgba(0,0,0,0.12)",
                md: "0 12px 40px rgba(0,0,0,0.15)",
              },
              borderRadius: { xs: 2, sm: 3, md: 4 },
              overflow: "hidden",
              mx: { xs: 1, sm: 0 },
            }}
          >
            <Box
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              sx={{
                background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                color: "white",
                p: { xs: 2.5, sm: 3, md: 4 },
                textAlign: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="bold"
                gutterBottom
                sx={{ position: "relative", zIndex: 1 }}
              >
                Welcome
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.95,
                  position: "relative",
                  zIndex: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" }
                }}
              >
                Please sign in to your account or create a new one
              </Typography>
            </Box>

            <CardContent sx={{ p: 0 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    py: { xs: 1.5, sm: 2 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(46, 204, 113, 0.04)",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                  },
                }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>

              <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                {/* Show error or success messages */}
                {errorMsg && (
                  <Box sx={{ color: "red", mb: 2, textAlign: "center" }}>
                    {errorMsg}
                  </Box>
                )}
                {successMsg && (
                  <Box sx={{ color: "green", mb: 2, textAlign: "center" }}>
                    {successMsg}
                  </Box>
                )}
                <AnimatePresence mode="wait">
                  {activeTab === 0 ? (
                    // Login Form
                    <motion.div
                      key="login"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Formik
                        initialValues={{
                          name: "",
                          password: "",
                          rememberMe: false,
                        }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                      >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                          <Form>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 2, sm: 2.5 },
                              }}
                            >
                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="name"
                                  label="Name"
                                  type="text"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.name && Boolean(errors.name)}
                                  helperText={touched.name && errors.name}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="password"
                                  label="Password"
                                  type={showPassword ? "text" : "password"}
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.password && Boolean(errors.password)}
                                  helperText={touched.password && errors.password}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock color="primary" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setShowPassword(!showPassword)}
                                          edge="end"
                                          sx={{
                                            transition: "transform 0.2s ease",
                                            "&:hover": {
                                              transform: "scale(1.1)",
                                            },
                                          }}
                                        >
                                          {showPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    gap: { xs: 1, sm: 2 },
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="rememberMe"
                                        checked={values.rememberMe}
                                        onChange={handleChange}
                                        color="primary"
                                        sx={{
                                          transition: "transform 0.2s ease",
                                          "&:hover": {
                                            transform: "scale(1.1)",
                                          },
                                        }}
                                      />
                                    }
                                    label="Remember Me"
                                    sx={{
                                      "& .MuiFormControlLabel-label": {
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                      },
                                    }}
                                  />
                                  <Link
                                    href="#"
                                    color="primary"
                                    sx={{
                                      textDecoration: "none",
                                      fontWeight: 600,
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                      transition: "color 0.3s ease",
                                      "&:hover": {
                                        color: "primary.dark",
                                      },
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      alert(
                                        "Forgot password functionality would be implemented here"
                                      );
                                    }}
                                  >
                                    Forgot Password?
                                  </Link>
                                </Box>
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <Button
                                  component={motion.button}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  size="large"
                                  sx={{
                                    mt: { xs: 1, sm: 2 },
                                    py: { xs: 1.5, sm: 2 },
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                                    boxShadow: "0 4px 15px rgba(46, 204, 113, 0.4)",
                                    "&:hover": {
                                      background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                                      boxShadow: "0 6px 20px rgba(46, 204, 113, 0.6)",
                                    },
                                  }}
                                  disabled={loading}
                                >
                                  {loading ? "Signing In..." : "Sign In"}
                                </Button>
                              </motion.div>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </motion.div>
                  ) : (
                    // Signup Form
                    <motion.div
                      key="signup"
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Formik
                        initialValues={{
                          name: "",
                          phone: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          role: "",
                        }}
                        validationSchema={signupSchema}
                        onSubmit={handleSignup}
                      >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                          <Form>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: 2, sm: 2.5 },
                              }}
                            >
                              {/* Image Upload */}
                              <motion.div variants={fieldVariants}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: { xs: 1, sm: 2 },
                                  }}
                                >
                                  <Box sx={{ position: "relative" }}>
                                    <Avatar
                                      component={motion.div}
                                      whileHover={{ scale: 1.05 }}
                                      sx={{
                                        width: { xs: 70, sm: 80, md: 90 },
                                        height: { xs: 70, sm: 80, md: 90 },
                                        bgcolor: "primary.light",
                                        border: "3px solid",
                                        borderColor: "primary.main",
                                        transition: "all 0.3s ease",
                                      }}
                                      src={imagePreview}
                                    >
                                      {!imagePreview && (
                                        <Person sx={{ fontSize: { xs: 35, sm: 40, md: 45 } }} />
                                      )}
                                    </Avatar>
                                    <IconButton
                                      component={motion.label}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      sx={{
                                        position: "absolute",
                                        bottom: -8,
                                        right: -8,
                                        bgcolor: "primary.main",
                                        color: "white",
                                        "&:hover": { bgcolor: "primary.dark" },
                                        width: { xs: 28, sm: 32 },
                                        height: { xs: 28, sm: 32 },
                                        boxShadow: "0 2px 8px rgba(46, 204, 113, 0.4)",
                                      }}
                                    >
                                      <PhotoCamera sx={{ fontSize: { xs: 14, sm: 16 } }} />
                                      <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                      />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="name"
                                  label="Full Name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.name && Boolean(errors.name)}
                                  helperText={touched.name && errors.name}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="phone"
                                  label="Phone Number"
                                  value={values.phone}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.phone && Boolean(errors.phone)}
                                  helperText={touched.phone && errors.phone}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Phone color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="email"
                                  label="Email Address"
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Email color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="password"
                                  label="Password"
                                  type={showPassword ? "text" : "password"}
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={touched.password && Boolean(errors.password)}
                                  helperText={touched.password && errors.password}
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock color="primary" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setShowPassword(!showPassword)}
                                          edge="end"
                                          sx={{
                                            transition: "transform 0.2s ease",
                                            "&:hover": {
                                              transform: "scale(1.1)",
                                            },
                                          }}
                                        >
                                          {showPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <TextField
                                  fullWidth
                                  name="confirmPassword"
                                  label="Confirm Password"
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.confirmPassword &&
                                    Boolean(errors.confirmPassword)
                                  }
                                  helperText={
                                    touched.confirmPassword && errors.confirmPassword
                                  }
                                  size={isMobile ? "medium" : "large"}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock color="primary" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                          }
                                          edge="end"
                                          sx={{
                                            transition: "transform 0.2s ease",
                                            "&:hover": {
                                              transform: "scale(1.1)",
                                            },
                                          }}
                                        >
                                          {showConfirmPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "primary.light",
                                        },
                                      },
                                    },
                                  }}
                                />
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                  <InputLabel id="role-label">Role</InputLabel>
                                  <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.role && Boolean(errors.role)}
                                  >
                                    <MenuItem value="learner">Learner</MenuItem>
                                    <MenuItem value="mentor">Mentor</MenuItem>
                                  </Select>
                                  {touched.role && errors.role && (
                                    <Typography variant="caption" color="error">
                                      {errors.role}
                                    </Typography>
                                  )}
                                </FormControl>
                              </motion.div>

                              <motion.div variants={fieldVariants}>
                                <Button
                                  component={motion.button}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  size="large"
                                  sx={{
                                    mt: { xs: 1, sm: 2 },
                                    py: { xs: 1.5, sm: 2 },
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: { xs: "1rem", sm: "1.1rem" },
                                    fontWeight: 600,
                                    background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                                    boxShadow: "0 4px 15px rgba(46, 204, 113, 0.4)",
                                    "&:hover": {
                                      background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                                      boxShadow: "0 6px 20px rgba(46, 204, 113, 0.6)",
                                    },
                                  }}
                                  disabled={loading}
                                >
                                  {loading ? "Creating Account..." : "Create Account"}
                                </Button>
                              </motion.div>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignupPage;