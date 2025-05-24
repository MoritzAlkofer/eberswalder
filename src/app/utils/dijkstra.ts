interface Node {
  id: number;
  distance: number;
  previous: number | null;
}

interface DijkstraResult {
  path: number[];
  pathMatrix: number[][];
}

export function dijkstra(adjacencyMatrix: number[][], start: number, end: number): DijkstraResult {
  const n = adjacencyMatrix.length;
  const nodes: Node[] = Array(n).fill(null).map((_, i) => ({
    id: i,
    distance: i === start ? 0 : Infinity,
    previous: null
  }));

  const unvisited = new Set(nodes.map(node => node.id));

  while (unvisited.size > 0) {
    // Find node with smallest distance
    let current = -1;
    let minDistance = Infinity;
    for (const nodeId of unvisited) {
      if (nodes[nodeId].distance < minDistance) {
        minDistance = nodes[nodeId].distance;
        current = nodeId;
      }
    }

    if (current === -1 || current === end) break;

    unvisited.delete(current);

    // Update distances to neighbors
    for (let neighbor = 0; neighbor < n; neighbor++) {
      const weight = adjacencyMatrix[current][neighbor];
      if (weight > 0 && unvisited.has(neighbor)) {
        const newDistance = nodes[current].distance + weight;
        if (newDistance < nodes[neighbor].distance) {
          nodes[neighbor].distance = newDistance;
          nodes[neighbor].previous = current;
        }
      }
    }
  }

  // Reconstruct path
  const path: number[] = [];
  let current: number | null = end;
  while (current !== null) {
    path.unshift(current);
    current = nodes[current].previous;
  }

  // Create new adjacency matrix with only the path edges
  const pathMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    const weight = adjacencyMatrix[from][to];
    pathMatrix[from][to] = weight;
    pathMatrix[to][from] = weight; // Make it symmetric
  }

  return { path, pathMatrix };
} 