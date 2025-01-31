'use client';

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Pie } from "react-chartjs-2";

const WES3BudgetTool = () => {
  const [siteSize, setSiteSize] = useState(5000);
  const [constructionType, setConstructionType] = useState("Commercial");
  const [budget, setBudget] = useState(0);

  const handleEstimate = () => {
    let estimatedBudget = siteSize * 0.15; // Example calculation
    setBudget(estimatedBudget);
  };

  const budgetData = {
    labels: ["Devices", "Installation", "Extras"],
    datasets: [
      {
        data: [budget * 0.6, budget * 0.3, budget * 0.1],
        backgroundColor: ["#F57C00", "#FFB74D", "#FFE0B2"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-600">WES3 Budget Tool</h1>
      
      <Card className="mt-4">
        <CardContent>
          <label className="block font-semibold">Construction Type</label>
          <Select value={constructionType} onChange={(e) => setConstructionType(e.target.value)}>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Industrial">Industrial</SelectItem>
          </Select>

          <label className="block font-semibold mt-4">Site Size (sq. ft)</label>
          <Slider value={siteSize} min={1000} max={50000} step={1000} onChange={(val) => setSiteSize(val)} />
          <Input type="number" value={siteSize} readOnly className="mt-2" />

          <Button className="mt-4 bg-orange-600 text-white" onClick={handleEstimate}>Estimate Budget</Button>
        </CardContent>
      </Card>
      
      {budget > 0 && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-xl font-bold text-orange-600">Estimated Budget: ${budget.toFixed(2)}</h2>
            <Pie data={budgetData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WES3BudgetTool;
