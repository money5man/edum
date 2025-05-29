import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, PaintBucket, Eraser, RotateCcw, Palette } from 'lucide-react';

const ArtStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#FF5252');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'fill'>('pencil');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  
  const colors = [
    '#FF5252', // Red
    '#FF9800', // Orange
    '#FFEB3B', // Yellow
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#9C27B0', // Purple
    '#795548', // Brown
    '#000000', // Black
    '#FFFFFF', // White
  ];
  
  const tools = [
    { id: 'pencil', icon: <Palette size={20} />, label: 'Pencil' },
    { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
    { id: 'fill', icon: <PaintBucket size={20} />, label: 'Fill' },
  ];
  
  const startGame = () => {
    setGameStarted(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Save initial state
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack([initialState]);
    }, 100);
  };
  
  useEffect(() => {
    if (!gameStarted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      // Save current drawing
      const currentDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Set canvas size
      const width = container.clientWidth;
      const height = Math.min(400, container.clientWidth * 0.6);
      canvas.width = width;
      canvas.height = height;
      
      // Set white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Try to restore drawing (it might be distorted due to canvas resize)
      try {
        ctx.putImageData(currentDrawing, 0, 0);
      } catch (e) {
        console.error('Could not restore drawing after resize');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gameStarted]);
  
  const startPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Save current state before drawing
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([...undoStack, currentState]);
    
    // Get position
    let x, y;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    if (tool === 'fill') {
      fillArea(x, y);
    } else {
      draw(x, y);
    }
  };
  
  const endPosition = () => {
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
  };
  
  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (!isDrawing) return;
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
    } else {
      ctx.strokeStyle = currentColor;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const fillArea = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Get target color at click position
    const targetPos = (Math.floor(startY) * width + Math.floor(startX)) * 4;
    const targetR = data[targetPos];
    const targetG = data[targetPos + 1];
    const targetB = data[targetPos + 2];
    
    // Get new color
    const fillColor = hexToRgb(currentColor);
    if (!fillColor) return;
    
    // Don't fill if target is already the fill color
    if (
      targetR === fillColor.r &&
      targetG === fillColor.g &&
      targetB === fillColor.b
    ) {
      return;
    }
    
    // Simple flood fill algorithm
    const queue: [number, number][] = [];
    queue.push([Math.floor(startX), Math.floor(startY)]);
    
    while (queue.length > 0) {
      const [x, y] = queue.pop()!;
      const pos = (y * width + x) * 4;
      
      // Check if this pixel has the target color
      if (
        x >= 0 && x < width &&
        y >= 0 && y < height &&
        data[pos] === targetR &&
        data[pos + 1] === targetG &&
        data[pos + 2] === targetB
      ) {
        // Set new color
        data[pos] = fillColor.r;
        data[pos + 1] = fillColor.g;
        data[pos + 2] = fillColor.b;
        
        // Add neighbors to queue
        queue.push([x + 1, y]);
        queue.push([x - 1, y]);
        queue.push([x, y + 1]);
        queue.push([x, y - 1]);
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'fill' || !isDrawing) return;
    draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'fill' || !isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    draw(x, y);
  };
  
  const undoLastAction = () => {
    if (undoStack.length <= 1) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Remove the last state
    const newUndoStack = [...undoStack];
    newUndoStack.pop();
    
    // Get the previous state
    const previousState = newUndoStack[newUndoStack.length - 1];
    
    // Restore the previous state
    ctx.putImageData(previousState, 0, 0);
    
    setUndoStack(newUndoStack);
  };
  
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link
    const link = document.createElement('a');
    link.download = 'eduplay-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  return (
    <div className="bg-pink-50 p-6 rounded-xl max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 text-pink-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Art Studio
          </motion.h2>
          
          <motion.p 
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Express your creativity and learn about colors, shapes, and famous artists!
          </motion.p>
          
          <motion.img
            src="https://images.pexels.com/photos/4545108/pexels-photo-4545108.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Art Studio"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <motion.button
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start Drawing
          </motion.button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-pink-700">Let's Create!</h3>
            
            <div className="flex space-x-2">
              <motion.button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg"
                onClick={undoLastAction}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={undoStack.length <= 1}
              >
                <RotateCcw size={20} />
              </motion.button>
              
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                onClick={saveDrawing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save size={20} />
              </motion.button>
            </div>
          </div>
          
          <div className="flex mb-4">
            <div className="mr-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      currentColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brush Size</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
                <div className="flex flex-col space-y-2">
                  {tools.map((t) => (
                    <motion.button
                      key={t.id}
                      className={`flex items-center p-2 rounded-lg ${
                        tool === t.id ? 'bg-pink-200 text-pink-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setTool(t.id as 'pencil' | 'eraser' | 'fill')}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="mr-2">{t.icon}</span>
                      <span className="text-sm">{t.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow-inner overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full touch-none"
                onMouseDown={startPosition}
                onMouseUp={endPosition}
                onMouseMove={handleMouseMove}
                onMouseLeave={endPosition}
                onTouchStart={startPosition}
                onTouchEnd={endPosition}
                onTouchMove={handleTouchMove}
              />
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-600">
            <p className="font-medium mb-1">Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the Fill tool to quickly color large areas</li>
              <li>Try mixing different colors and brush sizes</li>
              <li>The Eraser tool lets you fix mistakes</li>
              <li>Click the Save button to download your artwork</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtStudio;