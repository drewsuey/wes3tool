'use client';
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 space-y-4 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className }) => (
  <button
    className={`bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Input = ({ type, value, readOnly, className, onChange }) => (
  <input
    type={type}
    value={value}
    readOnly={readOnly}
    onChange={onChange}
    className={`border rounded-md p-3 w-full text-gray-700 ${className}`}
  />
);

const Select = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="border rounded-md p-3 w-full text-gray-700"
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
    className="w-full mt-2"
  />
);

const WES3BudgetTool = () => {
  const [siteSize, setSiteSize] = useState(5000);
  const [constructionType, setConstructionType] = useState("Commercial");
  const [projectPhase, setProjectPhase] = useState("Planning");
  const [floors, setFloors] = useState(1);
  const [staircases, setStaircases] = useState(1);
  const [interfaceIntegration, setInterfaceIntegration] = useState(false);
  const [reactIntegration, setReactIntegration] = useState(false);
  const [budget, setBudget] = useState(0);

  const handleEstimate = () => {
    let estimatedBudget = siteSize * 0.15 + floors * 500 + staircases * 300;
    if (interfaceIntegration) estimatedBudget += 1000;
    if (reactIntegration) estimatedBudget += 2000;
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
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-orange-600 text-center">WES3 Budget Tool</h1>
      
      <Card>
        <div className="space-y-8">
          <div>
            <label className="block font-semibold text-lg mb-2">Construction Type</label>
            <Select value={constructionType} onChange={(e) => setConstructionType(e.target.value)}>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
            </Select>
            <p className="text-sm text-gray-500 mt-1">Select the type of construction site.</p>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Project Phase</label>
            <Select value={projectPhase} onChange={(e) => setProjectPhase(e.target.value)}>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Mid-Construction">Mid-Construction</SelectItem>
              <SelectItem value="Finishing">Finishing</SelectItem>
            </Select>
            <p className="text-sm text-gray-500 mt-1">Choose the current phase of your project.</p>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Number of Floors</label>
            <Input type="number" value={floors} onChange={(e) => setFloors(Number(e.target.value))} />
            <p className="text-sm text-gray-500 mt-1">Enter the total number of floors in the site.</p>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Number of Staircases</label>
            <Input type="number" value={staircases} onChange={(e) => setStaircases(Number(e.target.value))} />
            <p className="text-sm text-gray-500 mt-1">Enter the number of staircases that require coverage.</p>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Site Size (sq. ft)</label>
            <Slider value={siteSize} min={1000} max={50000} step={1000} onChange={(val) => setSiteSize(val)} />
            <Input type="number" value={siteSize} readOnly className="mt-3" />
            <p className="text-sm text-gray-500 mt-1">Adjust the slider to represent the site's total square footage.</p>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Interface Integration</label>
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={interfaceIntegration}
                onChange={() => setInterfaceIntegration(!interfaceIntegration)}
                className="mr-3"
              />
              <span>Include interface integration for direct power devices.</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">REACT Integration</label>
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={reactIntegration}
                onChange={() => setReactIntegration(!reactIntegration)}
                className="mr-3"
              />
              <span>Enable REACT system integration for enhanced safety alerts.</span>
            </div>
          </div>

          <Button className="mt-6 w-full" onClick={handleEstimate}>Estimate Budget</Button>
        </div>
      </Card>
      
      {budget > 0 && (
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-600">Estimated Budget: ${budget.toFixed(2)}</h2>
            <Pie data={budgetData} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default WES3BudgetTool;
