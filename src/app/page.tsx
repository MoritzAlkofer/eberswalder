'use client';

import { useState } from 'react';
import Graph from './components/Graph';
import Image from 'next/image';
import { dijkstra } from './utils/dijkstra';

export default function Home() {
  const [showPath, setShowPath] = useState(false);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(8);

  // Example adjacency matrix for a simple graph
  // 0 = no connection
  // 0.5 = dashed black line
  // 1 = green edge
  // 2 = yellow edge
  // 3 = red edge
  const originalMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0], // Node 0
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Node 1
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // Node 2
    [0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // Node 3
    [0, 0, 0, 3, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Node 4
    [0, 0, 0, 0, 0.5, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], // Node 5
    [0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Node 6
    [0, 0, 0, 0, 0, 0, 2, 0, 0.5, 0, 0, 3, 0, 0, 0, 0, 0, 0], // Node 7 
    [0, 0, 0, 0, 0, 0, 0, 0.5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Node 8 
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0.5, 0, 0, 0, 0, 0, 0, 0], // Node 9
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 1, 0, 0, 0, 0, 0, 0], // Node 10
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0], // Node 11
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0], // Node 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0], // Node 13
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0], // Node 14
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0.5, 3], // Node 15
    [0.5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0], // Node 16
    [0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0], // Node 17
  ];

  // Custom positions for each node
  const nodePositions = [
    { x: 230, y: 700 },  // Node 0
    { x: 365, y: 700 },  // Node 1
    { x: 380, y: 640 },  // Node 2
    { x: 460, y: 650 },  // Node 3
    { x: 540, y: 660 },  // Node 4
    { x: 540, y: 460 },  // Node 5
    { x: 540, y: 420 },  // Node 6
    { x: 540, y: 380 },  // Node 7
    { x: 640, y: 240 },  // Node 8
    { x: 580, y: 200 },  // Node 9
    { x: 540, y: 280 },  // Node 10
    { x: 520, y: 340 },  // Node 11
    { x: 440, y: 360 },  // Node 12
    { x: 380, y: 360 },  // Node 13
    { x: 380, y: 400 },  // Node 14
    { x: 380, y: 480 },  // Node 15
    { x: 320, y: 600 },  // Node 16
    { x: 460, y: 470 },  // Node 17
  ];

  // Compute the path matrix when needed
  const { pathMatrix } = dijkstra(originalMatrix, startNode, endNode);
  const currentMatrix = showPath ? pathMatrix : originalMatrix;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Eberswalder Graph</h1>
      <p className="text-lg mb-8">
        Do you hate the eberswalder strasse and wonder how to get from A to B in the least annoying way?
        This is the app for you!
        Just select your start and end node and the Dijkstra will show you the shortest path between the two.    
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="startNode" className="text-sm font-medium">Start Node:</label>
            <select
              id="startNode"
              value={startNode}
              onChange={(e) => setStartNode(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg bg-white text-black"
            >
              {Array.from({ length: 18 }, (_, i) => (
                <option key={i} value={i}>Node {i}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="endNode" className="text-sm font-medium">End Node:</label>
            <select
              id="endNode"
              value={endNode}
              onChange={(e) => setEndNode(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg bg-white text-black"
            >
              {Array.from({ length: 18 }, (_, i) => (
                <option key={i} value={i}>Node {i}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowPath(!showPath)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-6"
          >
            {showPath ? 'Show Full Graph' : `Show Shortest Path (${startNode} to ${endNode})`}
          </button>
        </div>
        <div className="relative w-[880px] h-[812px]">
          <Image
            src="/eberswalder.png"
            alt="Eberswalder"
            fill
            className="rounded-lg object-cover"
          />
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg shadow p-4 flex flex-col gap-2 text-sm z-10 border border-gray-200 text-black">
            <div className="flex items-center gap-2">
              <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#22c55e" strokeWidth="4" /></svg>
              <span>Weight 1 (green)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#eab308" strokeWidth="4" /></svg>
              <span>Weight 2 (yellow)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#ef4444" strokeWidth="4" /></svg>
              <span>Weight 3 (red)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="black" strokeWidth="4" strokeDasharray="5,5" /></svg>
              <span>Weight 0.5 (dashed)</span>
            </div>
          </div>
          <div className="absolute inset-0">
            <Graph 
              adjacencyMatrix={currentMatrix} 
              width={880} 
              height={812} 
              nodePositions={nodePositions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
