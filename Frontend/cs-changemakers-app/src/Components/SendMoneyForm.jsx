import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // <-- Add this import
import { motion, AnimatePresence } from "framer-motion";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Phone,
  Send,
  TrendingUp,
  CheckCircle,
  Error as ErrorIcon,
  Person,
  AccountBalance,
  InfoOutlined
} from "@mui/icons-material";

const SendMoneyForm = () => {
  const location = useLocation(); // <-- Add this line
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("2376"); // Pre-fill with 2376
  const [recipientNumber, setRecipientNumber] = useState("2376"); // Optional: also pre-fill recipient
  const [paymentType, setPaymentType] = useState("disburse");
  const [operator, setOperator] = useState("mtn"); // Set MTN as default
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const apiKey = "qnoYzuMb4JOdAxNpzo42T";
  const feePercentage = 10; // 10% fee

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Calculate fee breakdown
  const calculateFees = (inputAmount) => {
    const total = Number(inputAmount) || 0;
    const fee = Math.round(total * (feePercentage / 100));
    const receiverAmount = total - fee;
    return { total, fee, receiverAmount };
  };

  const { total, fee, receiverAmount } = calculateFees(amount);

  const handleSubmit = async () => {
    setMessage("");
    setError(false);
    setPaymentId("");

    const cameroonPhoneRegex = /^2376\d{8}$/;
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount greater than 0");
      setError(true);
      return;
    }

    if (!cameroonPhoneRegex.test(phoneNumber)) {
      setMessage("Enter a valid sender Cameroon phone number (e.g. 237650000000)");
      setError(true);
      return;
    }

    if (!cameroonPhoneRegex.test(recipientNumber)) {
      setMessage("Enter a valid recipient Cameroon phone number (e.g. 237650000000)");
      setError(true);
      return;
    }

    if (!operator) {
      setMessage("Please select a telecom operator");
      setError(true);
      return;
    }

    // 1. Collect money from sender
    const collectEndpoint = "https://api.pay.mynkwa.com/collect";
    const disburseEndpoint = "https://api.pay.mynkwa.com/disburse";

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      // 1. Initiate collection
      const collectRes = await fetch(collectEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          amount: total,
          phoneNumber: phoneNumber.trim(),
          telecomOperator: operator,
          paymentType: "collection",
        }),
      });

      const collectData = await collectRes.json();

      console.log("Collect API response:", collectData); // <-- Log the data returned after the first transaction

      if (!collectRes.ok) {
        throw new Error(collectData.message || `Collect failed: ${collectRes.status}`);
      }

      // Store collection id in localStorage
      localStorage.setItem("nkwa_collection_id", collectData.id);

      // Save a new ID
      const ids = JSON.parse(localStorage.getItem("nkwa_collection_ids") || "[]");
      ids.push(collectData.id);
      localStorage.setItem("nkwa_collection_ids", JSON.stringify(ids));

      setMessage("Please check your phone and authorize the payment by entering your PIN. Waiting for payment confirmation...");
      setError(false);

      // Poll for collection status
      let status = collectData.status;
      let pollCount = 0;
      const maxPolls = 1000; // ~75 seconds
      while (status === "pending" && pollCount < maxPolls) {
        await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds
        const statusRes = await fetch(`https://api.pay.mynkwa.com/payments/${collectData.id}`, {
          method: "GET", // <-- Use POST instead of GET
          headers: { "X-API-Key": apiKey }
        });
        const statusData = await statusRes.json();
        status = statusData.status;
        pollCount++;
        if (status === "success") break;
        if (status === "failed" || status === "canceled") {
          throw new Error("Collection failed or was canceled. Disbursement cancelled.");
        }
      }

      if (status !== "success") {
        throw new Error("Payment not authorized or timed out. Disbursement cancelled.");
      }

      // 3. Disburse to recipient (only if status is success)
      const disburseRes = await fetch(disburseEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          amount: receiverAmount,
          phoneNumber: recipientNumber.trim(),
          telecomOperator: operator,
          paymentType: "disbursement",
        }),
      });

      const disburseData = await disburseRes.json();

      if (!disburseRes.ok) {
        throw new Error(disburseData.message || `Disburse failed: ${disburseRes.status}`);
      }

      setMessage(
        `✅ Payment successful!\n` +
        `Collected ${total.toLocaleString()} FCFA from sender (${phoneNumber})\n` +
        `Sent ${receiverAmount.toLocaleString()} FCFA to recipient (${recipientNumber})`
      );
      setError(false);

      // Reset form
      setAmount("");
      setPhoneNumber("");
      setRecipientNumber("");
      setOperator("");
      localStorage.removeItem("nkwa_collection_id");
    } catch (error) {
      setMessage(`❌ Payment error: ${error.message}`);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Prefill amount if passed from Mentor page
  useEffect(() => {
    if (location.state && location.state.amount) {
      setAmount(location.state.amount.toString());
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#2ecc71", // Solid emerald green background
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 80 },
                    height: { xs: 60, sm: 80 },
                    margin: "0 auto 16px",
                    background: "white", // match background
                    boxShadow: "white",
                  }}
                >
                  <AccountBalanceWallet sx={{ fontSize: { xs: 30, sm: 40 }, color: "#2ecc71" }} />
                </Avatar>
              </motion.div>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Make Payment
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                Send money with transparent fee structure
              </Typography>
            </Box>
          </motion.div>

          {/* Main Form Card */}
          <motion.div variants={itemVariants}>
            <Card
              elevation={20}
              sx={{
                borderRadius: 4,
                overflow: "visible",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Grid container spacing={3}>

                  {/* Payment Type Info */}
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Chip
                        icon={<Send sx={{ color: "#2ecc71" }} />}
                        label="Money Transfer Service (10% fee applies)"
                        sx={{
                          backgroundColor: "#e8f4fd",
                          color: "#667eea",
                          fontWeight: "medium",
                          py: 1,
                          width: "100%",
                          "& .MuiChip-icon": { color: "#667eea" }
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Amount Field */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Amount to Send (FCFA)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        required
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "#667eea",
                            "&.Mui-focused": { color: "#667eea" }
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f8f9ff",
                            "&.Mui-focused fieldset": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <AccountBalanceWallet sx={{ color: "#2ecc71", mr: 1 }} />
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Fee Breakdown */}
                  <AnimatePresence>
                    {amount && total > 0 && (
                      <Grid item xs={12}>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Paper
                            elevation={2}
                            sx={{
                              p: { xs: 2, sm: 3 },
                              backgroundColor: "#f8f9ff",
                              border: "1px solid #e3f2fd",
                              borderRadius: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#2ecc71",
                                mb: 2,
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                fontSize: { xs: "1rem", sm: "1.25rem" }
                              }}
                            >
                              <TrendingUp sx={{ mr: 1, color: "#2ecc71" }} />
                              Transaction Breakdown
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Total Amount:
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {total.toLocaleString()} FCFA
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Service Fee (10%):
                              </Typography>
                              <Typography variant="body2" color="#f44336" fontWeight="bold">
                                -{fee.toLocaleString()} FCFA
                              </Typography>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                              <Typography variant="body1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                                <Person sx={{ mr: 1, fontSize: 18, color: "#2ecc71" }} />
                                Recipient Receives:
                              </Typography>
                              <Typography variant="h6" color="#4caf50" fontWeight="bold">
                                {receiverAmount.toLocaleString()} FCFA
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "#667eea" }}>
                                <AccountBalance sx={{ mr: 1, fontSize: 16, color: "#2ecc71" }} />
                                Your Commission:
                              </Typography>
                              <Typography variant="body1" color="#667eea" fontWeight="bold">
                                +{fee.toLocaleString()} FCFA
                              </Typography>
                            </Box>
                          </Paper>
                        </motion.div>
                      </Grid>
                    )}
                  </AnimatePresence>

                  {/* Sender Phone Number Field */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Sender Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 237650000000"
                        required
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "#2ecc71",
                            "&.Mui-focused": { color: "#2ecc71" }
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f8f9ff",
                            "&.Mui-focused fieldset": {
                              borderColor: "#2ecc71",
                              borderWidth: 2,
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Phone sx={{ color: "#2ecc71", mr: 1 }} />
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Recipient Phone Number Field */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Recipient Phone Number"
                        value={recipientNumber}
                        onChange={(e) => setRecipientNumber(e.target.value)}
                        placeholder="e.g. 237650000000"
                        required
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "#2ecc71",
                            "&.Mui-focused": { color: "#2ecc71" }
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f8f9ff",
                            "&.Mui-focused fieldset": {
                              borderColor: "#2ecc71",
                              borderWidth: 2,
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <Phone sx={{ color: "#2ecc71", mr: 1 }} />
                          ),
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Operator Selection */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="operator-label"
                          sx={{
                            color: "#667eea",
                            "&.Mui-focused": { color: "#667eea" }
                          }}
                        >
                          Telecom Operator
                        </InputLabel>
                        <Select
                          labelId="operator-label"
                          value={operator}
                          label="Telecom Operator"
                          onChange={(e) => setOperator(e.target.value)}
                          required
                          sx={{
                            backgroundColor: "#f8f9ff",
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#667eea",
                                borderWidth: 2,
                              },
                            },
                          }}
                        >
                          <MenuItem value="mtn">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  backgroundColor: "#ffcc00",
                                  mr: 2,
                                }}
                              />
                              MTN
                            </Box>
                          </MenuItem>
                          <MenuItem value="orange">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  backgroundColor: "#ff6600",
                                  mr: 2,
                                }}
                              />
                              Orange
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        onClick={handleSubmit}
                        disabled={loading || !amount || total <= 0}
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          py: 2,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          fontWeight: "bold",
                          borderRadius: 3,
                          background: "#2ecc71",
                          color: "#fff",
                          textTransform: "none",
                          boxShadow: "0 8px 32px rgba(46, 204, 113, 0.3)",
                          "&:hover": {
                            background: "#27ae60",
                          },
                          "&.Mui-disabled": {
                            background: "#bdc3c7",
                            color: "white",
                          },
                        }}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <Send sx={{ color: "#2ecc71" }} />
                          )
                        }
                      >
                        {loading
                          ? "Processing Payment..."
                          : total > 0
                            ? `Send ${receiverAmount.toLocaleString()} FCFA (Fee: ${fee.toLocaleString()})`
                            : "Send Money"}
                      </Button>
                    </motion.div>
                  </Grid>

                  {/* Message Display */}
                  <AnimatePresence>
                    {message && (
                      <Grid item xs={12}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert
                            severity={error ? "error" : "success"}
                            icon={error ? <ErrorIcon sx={{ color: "#2ecc71" }} /> : <CheckCircle sx={{ color: "#2ecc71" }} />}
                            sx={{
                              borderRadius: 2,
                              "& .MuiAlert-message": {
                                whiteSpace: "pre-line",
                                fontWeight: "medium",
                                fontSize: { xs: "0.875rem", sm: "1rem" }
                              },
                              ...(error
                                ? {
                                  backgroundColor: "#ffebee",
                                  color: "#c62828",
                                  "& .MuiAlert-icon": { color: "#c62828" },
                                }
                                : {
                                  backgroundColor: "#e8f5e8",
                                  color: "#2e7d32",
                                  "& .MuiAlert-icon": { color: "#4caf50" },
                                }),
                            }}
                          >
                            {message}
                          </Alert>
                        </motion.div>
                      </Grid>
                    )}
                  </AnimatePresence>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mt: { xs: 3, sm: 4 } }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                Secure transfers with transparent fees • Powered by{" "}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  MyNkwa
                </Typography>
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SendMoneyForm;