'use client';

import React, { useState } from "react";

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>WES3 Budget Estimator</h2>
      <select
        value={constructionType}
        onChange={(e) => setConstructionType(e.target.value)}
        style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
      >
        <option value="">Select Construction Type</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="industrial">Industrial</option>
        <option value="marine">Marine</option>
      </select>
      <select
        value={projectPhase}
        onChange={(e) => setProjectPhase(e.target.value)}
        style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
      >
        <option value="">Select Project Phase</option>
        <option value="early">Early Planning</option>
        <option value="mid">Mid-Construction</option>
        <option value="finishing">Finishing Phase</option>
      </select>
      <input
        type="number"
        placeholder="Enter site size (sq ft)"
        value={siteSize}
        onChange={(e) => setSiteSize(e.target.value)}
        style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="Number of floors"
        value={floors}
        onChange={(e) => setFloors(e.target.value)}
        style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="Number of staircases"
        value={staircases}
        onChange={(e) => setStaircases(e.target.value)}
        style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
      />
      <div style={{ marginBottom: "16px" }}>
        <label style={{ marginRight: "8px" }}>
          <input
            type="checkbox"
            checked={interfaceIntegration}
            onChange={() => setInterfaceIntegration(!interfaceIntegration)}
          />
          Interface Integration
        </label>
        <label>
          <input
            type="checkbox"
            checked={reactIntegration}
            onChange={() => setReactIntegration(!reactIntegration)}
          />
          REACT Integration (Provides real-time alerts and advanced monitoring)
        </label>
      </div>
      <button
        onClick={calculateEstimate}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Get Estimate
      </button>
      {deviceEstimate && (
        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
          <h3 style={{ fontSize: "20px" }}>Estimated Devices:</h3>
          <p>Call Points: {deviceEstimate.callPoints}</p>
          <p>Smoke Detectors: {deviceEstimate.smokeDetectors}</p>
          <p>Heat Detectors: {deviceEstimate.heatDetectors}</p>
          <p>Total Devices: {deviceEstimate.totalDevices}</p>
          {interfaceIntegration && <p>Includes Interface Integration</p>}
          {reactIntegration && <p>Includes REACT Integration (Real-time alerts and advanced monitoring)</p>}
        </div>
      )}
    </div>
  );
}
