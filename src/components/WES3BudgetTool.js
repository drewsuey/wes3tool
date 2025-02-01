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
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// WES3 Theme
const theme = createTheme({
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
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Enter Site Details", "Select Integrations", "Get Estimate"];

  // Input Validation
  const validateInputs = () => {
    const newErrors = {};
    if (siteSize <= 0) newErrors.siteSize = "Site size must be greater than 0.";
    if (!constructionType) newErrors.constructionType = "Construction type is required.";
    if (!projectPhase) newErrors.projectPhase = "Project phase is required.";
    if (floors <= 0) newErrors.floors = "Number of floors must be greater than 0.";
    if (staircases <= 0) newErrors.staircases = "Number of staircases must be greater than 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url('/logo.jpg')`, // Path to the logo in the public folder
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure it covers the full height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            margin: "0 auto",
            backgroundColor: "white", // Keep the content card white
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" color="primary" textAlign="center" gutterBottom>
            WES3 Budget Estimator
          </Typography>

          <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
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
              <Grid item xs={12}>
                <TextField
                  label="Number of Floors"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  error={!!errors.floors}
                  helperText={errors.floors}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Number of Staircases"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={staircases}
                  onChange={(e) => setStaircases(Number(e.target.value))}
                  error={!!errors.staircases}
                  helperText={errors.staircases}
                />
              </Grid>
            </Grid>
          )}

          <Box sx={{ marginTop: 4 }}>
            {activeStep > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (validateInputs()) {
                  setActiveStep(activeStep + 1);
                }
              }}
              sx={{ marginLeft: activeStep > 0 ? 2 : 0 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
