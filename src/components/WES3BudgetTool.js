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
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Custom Material-UI theme with WES3 colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#F57C00", // WES3 orange
    },
    background: {
      default: "#FFFFFF", // WES3 white
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

  const calculateEstimate = () => {
    const callPoints = Math.ceil(siteSize / 5000) * floors;
    const smokeDetectors = Math.ceil(siteSize / 1000) * floors;
    const heatDetectors = Math.ceil(siteSize / 1500) * floors;
    const totalDevices = callPoints + smokeDetectors + heatDetectors;

    setDeviceEstimate({ callPoints, smokeDetectors, heatDetectors, totalDevices });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto", backgroundColor: "#FFFFFF", borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
          WES3 Budget Estimator
        </Typography>
        <Grid container spacing={2}>
          {/* Construction Type */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Select Construction Type:
            </Typography>
            <Select
              value={constructionType}
              onChange={(e) => setConstructionType(e.target.value)}
              fullWidth
              displayEmpty
              variant="outlined"
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

          {/* Project Phase */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Select Project Phase:
            </Typography>
            <Select
              value={projectPhase}
              onChange={(e) => setProjectPhase(e.target.value)}
              fullWidth
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="early">Early Planning</MenuItem>
              <MenuItem value="mid">Mid-Construction</MenuItem>
              <MenuItem value="finishing">Finishing Phase</MenuItem>
            </Select>
          </Grid>

          {/* Site Size */}
          <Grid item xs={12}>
            <TextField
              label="Site Size (sq ft)"
              type="number"
              fullWidth
              variant="outlined"
              value={siteSize}
              onChange={(e) => setSiteSize(Number(e.target.value))}
            />
          </Grid>

          {/* Number of Floors */}
          <Grid item xs={12}>
            <TextField
              label="Number of Floors"
              type="number"
              fullWidth
              variant="outlined"
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
            />
          </Grid>

          {/* Number of Staircases */}
          <Grid item xs={12}>
            <TextField
              label="Number of Staircases"
              type="number"
              fullWidth
              variant="outlined"
              value={staircases}
              onChange={(e) => setStaircases(Number(e.target.value))}
            />
          </Grid>

          {/* Checkbox Options */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={interfaceIntegration}
                  onChange={() => setInterfaceIntegration(!interfaceIntegration)}
                  color="primary"
                />
              }
              label="Interface Integration - Allows connection with external systems"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reactIntegration}
                  onChange={() => setReactIntegration(!reactIntegration)}
                  color="primary"
                />
              }
              label="REACT Integration - Provides real-time alerts and advanced monitoring"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={calculateEstimate}>
              Get Estimate
            </Button>
          </Grid>
        </Grid>

        {/* Results */}
        {deviceEstimate && (
          <Box sx={{ marginTop: 4, padding: 2, backgroundColor: "#F5F5F5", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Estimated Devices:
            </Typography>
            <Typography>Call Points: {deviceEstimate.callPoints}</Typography>
            <Typography>Smoke Detectors: {deviceEstimate.smokeDetectors}</Typography>
            <Typography>Heat Detectors: {deviceEstimate.heatDetectors}</Typography>
            <Typography>Total Devices: {deviceEstimate.totalDevices}</Typography>
            {interfaceIntegration && <Typography>Includes Interface Integration</Typography>}
            {reactIntegration && <Typography>Includes REACT Integration</Typography>}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
