import Graph from './components/Graph';
import Image from 'next/image';

export default function Home() {
  // Example adjacency matrix for a simple graph
  // 0 = no connection
  // 1 = green edge
  // 2 = yellow edge
  // 3 = red edge
  const sampleMatrix = [
    [0, 1, 2, 3],
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0]
  ];

  // Custom positions for each node
  const nodePositions = [
    { x: 100, y: 100 },  // Node 0
    { x: 400, y: 100 },  // Node 1
    { x: 400, y: 400 },  // Node 2
    { x: 100, y: 400 }   // Node 3
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Interactive Graph</h1>
      <div className="relative w-[500px] h-[500px]">
        <Image
          src="/eberswalder.png"
          alt="Eberswalder"
          fill
          className="rounded-lg object-cover"
        />
        <div className="absolute inset-0">
          <Graph 
            adjacencyMatrix={sampleMatrix} 
            width={500} 
            height={500} 
            nodePositions={nodePositions}
          />
        </div>
      </div>
    </main>
  );
}
