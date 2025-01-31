'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function WES3BudgetTool() {
  const [siteSize, setSiteSize] = useState(0);
  const [constructionType, setConstructionType] = useState("");
  const [projectPhase, setProjectPhase] = useState("");
  const [deviceEstimate, setDeviceEstimate] = useState(null);

  const calculateEstimate = () => {
    let callPoints = Math.ceil(siteSize / 5000); // Example logic: 1 call point per 5000 sq ft
    let smokeDetectors = Math.ceil(siteSize / 1000); // Example logic: 1 smoke detector per 1000 sq ft
    let heatDetectors = Math.ceil(siteSize / 1500); // Example logic: 1 heat detector per 1500 sq ft
    
    setDeviceEstimate({ callPoints, smokeDetectors, heatDetectors });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">WES3 Budget Estimator</h2>
          <Select onValueChange={setConstructionType} value={constructionType}>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
            <SelectItem value="marine">Marine</SelectItem>
          </Select>
          <Select onValueChange={setProjectPhase} value={projectPhase} className="mt-2">
            <SelectItem value="early">Early Planning</SelectItem>
            <SelectItem value="mid">Mid-Construction</SelectItem>
            <SelectItem value="finishing">Finishing Phase</SelectItem>
          </Select>
          <Input
            type="number"
            placeholder="Enter site size (sq ft)"
            className="mt-2"
            value={siteSize}
            onChange={(e) => setSiteSize(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={calculateEstimate}>
            Get Estimate
          </Button>
          {deviceEstimate && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold">Estimated Devices:</h3>
              <p>Call Points: {deviceEstimate.callPoints}</p>
              <p>Smoke Detectors: {deviceEstimate.smokeDetectors}</p>
              <p>Heat Detectors: {deviceEstimate.heatDetectors}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
