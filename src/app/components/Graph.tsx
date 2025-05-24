'use client';

import React from 'react';

interface NodePosition {
  x: number;
  y: number;
}

interface GraphProps {
  adjacencyMatrix: number[][];
  width?: number;
  height?: number;
  nodePositions?: NodePosition[];
}

const Graph: React.FC<GraphProps> = ({ 
  adjacencyMatrix, 
  width = 400, 
  height = 400,
  nodePositions
}) => {
  const nodeCount = adjacencyMatrix.length;
  const nodeRadius = 10;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - nodeRadius * 2;

  const getEdgeColor = (weight: number): string => {
    switch (weight) {
      case 1: return '#22c55e'; // green
      case 2: return '#eab308'; // yellow
      case 3: return '#ef4444'; // red
      default: return 'transparent';
    }
  };

  const getNodePosition = (index: number) => {
    if (nodePositions && nodePositions[index]) {
      return nodePositions[index];
    }
    // Fallback to circular layout if no position is provided
    const angle = (2 * Math.PI * index) / nodeCount;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  // Generate edges from adjacency matrix
  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const weight = adjacencyMatrix[i][j];
      if (weight > 0) {
        const start = getNodePosition(i);
        const end = getNodePosition(j);
        edges.push(
          <line
            key={`edge-${i}-${j}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={getEdgeColor(weight)}
            strokeWidth="3"
          />
        );
      }
    }
  }

  // Generate nodes
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const pos = getNodePosition(i);
    return (
      <circle
        key={`node-${i}`}
        cx={pos.x}
        cy={pos.y}
        r={nodeRadius}
        fill="white"
      />
    );
  });

  return (
    <svg width={width} height={height}>
      {edges}
      {nodes}
    </svg>
  );
};

export default Graph; 