import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';

// Custom theme to match the green color
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4CAF50',
          },
        },
      },
    },
  },
});

export const MentorshipApplication = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        bgcolor="#ffffff" // Full white background
        padding={2}
      >
        <Box
          width="100%"
          maxWidth="500px"
          bgcolor="white"
          p={4}
          borderRadius={2}
          boxShadow={3}
        >
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Mentorship Application
          </Typography>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Area of Expertise"
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Why do you want a mentor?"
                  multiline
                  rows={4}
                  color="primary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: '#4CAF50', color: 'white' }}
            >
              Submit Application
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MentorshipApplication;
