import React from 'react';
import ReactFlow from 'react-flow-renderer';

const workflow = "User -> 360 Camera: Capture image\n360 Camera -> Mobile App: Send captured image\nMobile App -> Cloud Storage: Save image\nCloud Storage -> Mobile App: Return image URL\nMobile App -> Floor Plan Service: Map image URL to point\nFloor Plan Service -> Database: Save mapping\nDatabase -> Floor Plan Service: Confirm save\nFloor Plan Service -> Mobile App: Confirm mapping";

// Convert the workflow string into an array of steps
const steps = workflow.split('\n').map((step, index) => ({
  id: `step${index}`,
  data: { label: step },
  position: { x: 0, y: index * 100 }, // Position each step vertically
}));

// Create an array of edges between the steps
const edges = steps.slice(1).map((step, index) => ({
  id: `edge${index}`,
  source: `step${index}`,
  target: step.id,
  animated: true,
}));

const elements = [...steps, ...edges];

const WorkflowChart = () => {
  return <ReactFlow elements={elements} style={{ width: '100%', height: '100vh' }} />;
};

export default WorkflowChart;