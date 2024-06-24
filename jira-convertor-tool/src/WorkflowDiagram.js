import React, { useRef, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import { toPng } from 'html-to-image';

const workflow = "User -> Floor Plan Upload Form: Select floor plan\nFloor Plan Upload Form -> Frontend: Validate file\nFrontend -> Floor Plan Upload Form: Display validation errors (if any)\nUser -> Floor Plan Upload Form: Correct errors and submit floor plan\nFloor Plan Upload Form -> Backend: Upload floor plan\nBackend -> Cloud Storage: Store floor plan\nCloud Storage -> Backend: Return file URL\nBackend -> Floor Plan Upload Form: Confirm upload and display floor plan";

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

const WorkflowDiagram = () => {
  const flowRef = useRef();

  const downloadImage = async () => {
    const dataUrl = await toPng(flowRef.current);
    const link = document.createElement('a');
    link.download = 'workflow.png';
    link.href = dataUrl;
    link.click();
  };

  // Attach the downloadImage function to a global variable
  useEffect(() => {
    window.downloadWorkflowImage = downloadImage;
  }, []);

  return (
    <div ref={flowRef}>
      <ReactFlow elements={elements} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default WorkflowDiagram;