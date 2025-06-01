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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Create custom theme with teal color
const theme = createTheme({
  palette: {
    primary: {
      main: "#009688", // Teal
      light: "#4db6ac",
      dark: "#00695c",
    },
    secondary: {
      main: "#26a69a",
    },
  },
});

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Validation schemas
  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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

  const handleLogin = (values) => {
    console.log("Login:", values);
    alert("Login form submitted! Check console for values.");
  };

  const handleSignup = (values) => {
    const formData = {
      ...values,
      image: selectedImage,
    };
    console.log("Signup:", formData);
    alert("Signup form submitted! Check console for values.");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width:"95vw",  
          minHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
          padding: { xs: 2, sm: 3 },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
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
                  fontSize: "1rem",
                  fontWeight: 600,
                  py: 2,
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 ? (
                // Login Form
                <Formik
                  initialValues={{
                    email: "",
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
                          gap: 2.5,
                        }}
                      >
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />

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
                        />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="rememberMe"
                                checked={values.rememberMe}
                                onChange={handleChange}
                                color="primary"
                              />
                            }
                            label="Remember Me"
                          />
                          <Link
                            href="#"
                            color="primary"
                            sx={{ textDecoration: "none", fontWeight: 500 }}
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

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                          }}
                        >
                          Sign In
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              ) : (
                // Signup Form
                <Formik
                  initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
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
                          gap: 2.5,
                        }}
                      >
                        {/* Image Upload */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <Avatar
                              sx={{
                                width: 80,
                                height: 80,
                                bgcolor: "primary.light",
                                border: "3px solid",
                                borderColor: "primary.main",
                              }}
                              src={imagePreview}
                            >
                              {!imagePreview && (
                                <Person sx={{ fontSize: 40 }} />
                              )}
                            </Avatar>
                            <IconButton
                              component="label"
                              sx={{
                                position: "absolute",
                                bottom: -8,
                                right: -8,
                                bgcolor: "primary.main",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                                width: 32,
                                height: 32,
                              }}
                            >
                              <PhotoCamera sx={{ fontSize: 16 }} />
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </IconButton>
                          </Box>
                        </Box>

                        <TextField
                          fullWidth
                          name="name"
                          label="Full Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />

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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />

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
                        />

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
                        />

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                          }}
                        >
                          Create Account
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default SignupPage;
