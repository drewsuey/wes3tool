'use client';

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className }) => (
  <button
    className={`bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Input = ({ type, value, readOnly, className }) => (
  <input
    type={type}
    value={value}
    readOnly={readOnly}
    className={`border rounded-md p-2 w-full ${className}`}
  />
);

const Select = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="border rounded-md p-2 w-full"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Slider = ({ value, min, max, step, onChange }) => (
  <input
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full"
  />
);

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
        <div>
          <label className="block font-semibold">Construction Type</label>
          <Select value={constructionType} onChange={(e) => setConstructionType(e.target.value)}>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Industrial">Industrial</SelectItem>
          </Select>

          <label className="block font-semibold mt-4">Site Size (sq. ft)</label>
          <Slider value={siteSize} min={1000} max={50000} step={1000} onChange={(val) => setSiteSize(val)} />
          <Input type="number" value={siteSize} readOnly className="mt-2" />

          <Button className="mt-4" onClick={handleEstimate}>Estimate Budget</Button>
        </div>
      </Card>
      
      {budget > 0 && (
        <Card className="mt-6">
          <div>
            <h2 className="text-xl font-bold text-orange-600">Estimated Budget: ${budget.toFixed(2)}</h2>
            <Pie data={budgetData} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default WES3BudgetTool;
