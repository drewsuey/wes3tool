'use client';

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Tooltip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  createTheme,
  ThemeProvider,
  Switch,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import jsPDF from "jspdf";

// WES3 Theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F57C00",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F57C00",
    },
  },
});

export default function WES3BudgetTool() {
  const [siteSize, setSiteSize] = useState(0);
  const [constructionType, setConstructionType] = useState("");
  const [projectPhase, setProjectPhase] = useState("");
  const [floors, setFloors] = useState(1);
  const [staircases, setStaircases] = useState(1);
  const [interfaceIntegration, setInterfaceIntegration] = useState(false);
  const [reactIntegration, setReactIntegration] = useState(false);
  const [deviceEstimate, setDeviceEstimate] = useState(null);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Enter Site Details", "Select Integrations", "Get Estimate"];

  // Input Validation
  const validateInputs = () => {
    const newErrors = {};
    if (siteSize <= 0) newErrors.siteSize = "Site size must be greater than 0.";
    if (!constructionType) newErrors.constructionType = "Construction type is required.";
    if (!projectPhase) newErrors.projectPhase = "Project phase is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate Estimate
  const calculateEstimate = () => {
    const callPoints = Math.ceil(siteSize / 5000) * floors;
    const smokeDetectors = Math.ceil(siteSize / 1000) * floors;
    const heatDetectors = Math.ceil(siteSize / 1500) * floors;
    const totalDevices = callPoints + smokeDetectors + heatDetectors;

    setDeviceEstimate({ callPoints, smokeDetectors, heatDetectors, totalDevices });
  };

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("WES3 Budget Estimate", 10, 10);
    doc.text(`Call Points: ${deviceEstimate.callPoints}`, 10, 20);
    doc.text(`Smoke Detectors: ${deviceEstimate.smokeDetectors}`, 10, 30);
    doc.text(`Heat Detectors: ${deviceEstimate.heatDetectors}`, 10, 40);
    doc.text(`Total Devices: ${deviceEstimate.totalDevices}`, 10, 50);
    doc.save("budget-estimate.pdf");
  };

  // Shareable Link
  const generateShareableLink = () => {
    const queryParams = new URLSearchParams({
      siteSize,
      constructionType,
      projectPhase,
      floors,
      staircases,
      interfaceIntegration,
      reactIntegration,
    }).toString();
    return `${window.location.origin}?${queryParams}`;
  };

  // Stepper Navigation
  const handleNext = () => {
    if (activeStep === 0 && validateInputs()) {
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      setActiveStep((prev) => prev + 1);
      calculateEstimate();
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #F57C00 0%, #FFFFFF 100%)",
          minHeight: "100vh",
          padding: 4,
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <img src="/logo.jpg" alt="WES3 Logo" style={{ width: "100px", marginBottom: "8px" }} />
          <Typography variant="h5" color="primary">
            WES3 Budget Estimator
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
        </Box>

        <Box
          sx={{
            maxWidth: 800,
            margin: "0 auto",
            backgroundColor: "background.default",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Select Construction Type:
                  <Tooltip title="Choose the type of site you're building." arrow>
                    <IconButton size="small" color="primary">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Select
                  value={constructionType}
                  onChange={(e) => setConstructionType(e.target.value)}
                  fullWidth
                  displayEmpty
                  variant="outlined"
                  error={!!errors.constructionType}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="industrial">Industrial</MenuItem>
                  <MenuItem value="marine">Marine</MenuItem>
                </Select>
              </Grid>

              {/* Other Inputs */}
              <Grid item xs={12}>
                <TextField
                  label="Site Size (sq ft)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={siteSize}
                  onChange={(e) => setSiteSize(Number(e.target.value))}
                  error={!!errors.siteSize}
                  helperText={errors.siteSize}
                />
              </Grid>
              {/* Add floors and staircases */}
            </Grid>
          )}

          {/* Step 2 & Step 3 */}
          {activeStep === 2 && deviceEstimate && (
            <Box>
              <Typography>Call Points: {deviceEstimate.callPoints}</Typography>
              <Button onClick={exportPDF}>Export as PDF</Button>
            </Box>
          )}

          <Box sx={{ marginTop: 4 }}>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            <Button onClick={handleNext}>Next</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
