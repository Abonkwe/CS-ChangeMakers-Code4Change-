import { useState } from "react";
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
} from "@mui/material";
import { 
  AccountBalanceWallet, 
  Phone, 
  Send, 
  Receipt,
  SwapHoriz,
  CheckCircle,
  Error as ErrorIcon
} from "@mui/icons-material";

const SendMoneyForm = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [operator, setOperator] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const apiKey = "qnoYzuMb4JOdAxNpzo42T";

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
      setMessage("Enter a valid Cameroon phone number (e.g. 237650000000)");
      setError(true);
      return;
    }

    if (!paymentType) {
      setMessage("Please select a payment type");
      setError(true);
      return;
    }

    if (!operator) {
      setMessage("Please select a telecom operator");
      setError(true);
      return;
    }

    // Determine API endpoint and payment type based on selection
    const apiEndpoint = paymentType === "disburse" 
      ? "https://api.pay.mynkwa.com/collect" 
      : "https://api.pay.mynkwa.com/disburse";
    
    const actualPaymentType = paymentType === "disburse" ? "collection" : "disbursement";

    const paymentData = {
      amount: Number(amount),
      phoneNumber: phoneNumber.trim(),
      telecomOperator: operator,
      paymentType: actualPaymentType,
    };

    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { id, status, amount, telecomOperator, createdAt } = data;

      setPaymentId(id);

      const actionText = paymentType === "disburse" ? "Money Sent" : "Payment Collected";
      setMessage(
        `✅ ${actionText} Successfully!\n` +
        `🆔 Payment ID: ${id}\n` +
        `📱 Phone: ${phoneNumber}\n` +
        `💰 Amount: ${amount} FCFA\n` +
        `📡 Operator: ${telecomOperator.toUpperCase()}\n` +
        `📝 Type: ${paymentType.toUpperCase()}\n` +
        `📅 Created At: ${new Date(createdAt).toLocaleString()}\n` +
        `📈 Status: ${status.toUpperCase()}`
      );
      setError(false);

      setAmount("");
      setPhoneNumber("");
      setPaymentType("");
      setOperator("");
    } catch (error) {
      console.error("Payment error:", error);
      setMessage(`❌ Payment error: ${error.message}`);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "95vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto 16px",
              background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
              boxShadow: "0 8px 32px rgba(46, 204, 113, 0.3)",
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 1,
              background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Payment Gateway
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Send or collect mobile money payments securely
          </Typography>
        </Box>

        {/* Main Form Card */}
        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
            overflow: "visible",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Payment Type Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel
                id="payment-type-label"
                sx={{ 
                  color: "#2ecc71",
                  "&.Mui-focused": { color: "#2ecc71" }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SwapHoriz sx={{ mr: 1, fontSize: 20 }} />
                  Payment Type
                </Box>
              </InputLabel>
              <Select
                labelId="payment-type-label"
                value={paymentType}
                label="Payment Type"
                onChange={(e) => setPaymentType(e.target.value)}
                required
                sx={{
                  backgroundColor: "#f8fffe",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2ecc71",
                      borderWidth: 2,
                    },
                  },
                }}
              >
                <MenuItem value="disburse">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Send sx={{ mr: 2, color: "#2ecc71" }} />
                    Disburse (Send Money)
                  </Box>
                </MenuItem>
                <MenuItem value="collect">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Receipt sx={{ mr: 2, color: "#2ecc71" }} />
                    Collect (Request Payment)
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {/* Payment Summary Chip */}
            {paymentType && (
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <Chip
                  icon={paymentType === "disburse" ? <Send /> : <Receipt />}
                  label={
                    paymentType === "disburse" 
                      ? "You will send money to the specified phone number" 
                      : "You will request payment from the specified phone number"
                  }
                  sx={{
                    backgroundColor: "#e8f8f5",
                    color: "#2ecc71",
                    fontWeight: "medium",
                    py: 1,
                    "& .MuiChip-icon": { color: "#2ecc71" }
                  }}
                />
              </Box>
            )}

            {/* Amount Field */}
            <TextField
              fullWidth
              label="Amount (FCFA)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": {
                  color: "#2ecc71",
                  "&.Mui-focused": { color: "#2ecc71" }
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f8fffe",
                  "&.Mui-focused fieldset": {
                    borderColor: "#2ecc71",
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

            {/* Phone Number Field */}
            <TextField
              fullWidth
              label="Phone Number (e.g. 237650000000)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": {
                  color: "#2ecc71",
                  "&.Mui-focused": { color: "#2ecc71" }
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f8fffe",
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

            {/* Operator Selection */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel
                id="operator-label"
                sx={{ 
                  color: "#2ecc71",
                  "&.Mui-focused": { color: "#2ecc71" }
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
                  backgroundColor: "#f8fffe",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2ecc71",
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

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                boxShadow: "0 8px 32px rgba(46, 204, 113, 0.3)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                  boxShadow: "0 12px 40px rgba(46, 204, 113, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
                "&.Mui-disabled": {
                  background: "#bdc3c7",
                  color: "white",
                },
                transition: "all 0.3s ease",
              }}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : paymentType === "disburse" ? (
                  <Send />
                ) : paymentType === "collect" ? (
                  <Receipt />
                ) : (
                  <SwapHoriz />
                )
              }
            >
              {loading
                ? "Processing..."
                : paymentType === "disburse"
                ? "Send Money"
                : paymentType === "collect"
                ? "Request Payment"
                : "Process Payment"}
            </Button>

            {/* Message Display */}
            {message && (
              <Box sx={{ mt: 3 }}>
                <Alert
                  severity={error ? "error" : "success"}
                  icon={error ? <ErrorIcon /> : <CheckCircle />}
                  sx={{
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      whiteSpace: "pre-line",
                      fontWeight: "medium",
                    },
                    ...(error
                      ? {
                          backgroundColor: "#ffebee",
                          color: "#c62828",
                          "& .MuiAlert-icon": { color: "#c62828" },
                        }
                      : {
                          backgroundColor: "#e8f8f5",
                          color: "#2e7d32",
                          "& .MuiAlert-icon": { color: "#2ecc71" },
                        }),
                  }}
                >
                  {message}
                </Alert>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Secure transactions powered by{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                color: "#2ecc71",
              }}
            >
              MyNkwa
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SendMoneyForm;