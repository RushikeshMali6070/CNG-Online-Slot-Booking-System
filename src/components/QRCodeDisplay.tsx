interface QRCodeDisplayProps {
  data: string;
  size?: number;
}

export function QRCodeDisplay({ data, size = 200 }: QRCodeDisplayProps) {
  // Simple QR code visual representation using a grid pattern
  // In a real app, you'd use a library like 'qrcode.react' or 'react-qr-code'
  
  const gridSize = 25;
  const cellSize = size / gridSize;
  
  // Generate a pseudo-random but deterministic pattern based on the data
  const generatePattern = (data: string) => {
    const pattern: boolean[][] = [];
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash = hash & hash;
    }
    
    for (let i = 0; i < gridSize; i++) {
      pattern[i] = [];
      for (let j = 0; j < gridSize; j++) {
        // Create a deterministic pattern
        const seed = (hash + i * gridSize + j) * 2654435761;
        pattern[i][j] = (seed % 100) > 45;
      }
    }
    
    // Add corner markers (typical QR code feature)
    const markerSize = 7;
    const addMarker = (startX: number, startY: number) => {
      for (let i = 0; i < markerSize; i++) {
        for (let j = 0; j < markerSize; j++) {
          if (i === 0 || i === markerSize - 1 || j === 0 || j === markerSize - 1 ||
              (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            pattern[startX + i][startY + j] = true;
          } else {
            pattern[startX + i][startY + j] = false;
          }
        }
      }
    };
    
    addMarker(0, 0);
    addMarker(0, gridSize - markerSize);
    addMarker(gridSize - markerSize, 0);
    
    return pattern;
  };
  
  const pattern = generatePattern(data);
  
  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-lg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="white" />
        {pattern.map((row, i) =>
          row.map((cell, j) =>
            cell ? (
              <rect
                key={`${i}-${j}`}
                x={j * cellSize}
                y={i * cellSize}
                width={cellSize}
                height={cellSize}
                fill="black"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
