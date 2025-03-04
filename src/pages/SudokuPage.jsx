import React, { useState, useEffect, useRef } from "react";
import PlaygroundLayout from "../components/PlaygroundLayout";
import "./SudokuPage.css";

const minAnimationSpeed = 0;  
const maxAnimationSpeed = 500; 
const defaultAnimationSpeed = 250; 

const createGrid = () => {
    let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let boxIndex = 0; boxIndex < 3; boxIndex++) {
        let boxNumbers = shuffle(Array.from({ length: 9 }, (_, i) => i + 1));

        for (let i = boxIndex * 3; i < boxIndex * 3 + 3; i++) {
            for (let j = boxIndex * 3; j < boxIndex * 3 + 3; j++) {
                grid[i][j] = boxNumbers.pop();
            }
        }
    }

    solve(grid, 0, 0);
    removeCells(grid, 40);
    return grid;
}

const solve = (grid, row, col) => {
    if (row === 9) {
        return true;
    }
    const nextCol = (col + 1) % 9;
    const nextRow = nextCol === 0 ? row + 1 : row;
    if (grid[row][col] !== 0) {
        return solve(grid, nextRow, nextCol);
    }
    for (let num = 1; num <= 9; num++) {
        if (getConflictingCells(grid, row, col, num).length === 0) {
            grid[row][col] = num;
            if (solve(grid, nextRow, nextCol)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}

function getConflictingCells(grid, row, col, num) {
    let conflicts = [];
    if (num === 0) return conflicts;

    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num && i !== col) conflicts.push([row, i]);
        if (grid[i][col] === num && i !== row) conflicts.push([i, col]);

        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (grid[boxRow][boxCol] === num && (boxRow !== row || boxCol !== col)) {
            conflicts.push([boxRow, boxCol]);
        }
    }

    return conflicts;
}

function getAllConflictingCells(grid) {
    const conflictingCellsSet = new Set();
    for(let i  = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cells = getConflictingCells(grid, i, j, grid[i][j]);
            if (cells.length !== 0) {
                conflictingCellsSet.add(`${i},${j}`);
                cells.forEach(value => conflictingCellsSet.add(`${value[0]},${value[1]}`))
            }
        }
    }
    return conflictingCellsSet;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function removeCells(grid, count) {
    let attempts = count;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            attempts--;
        }
    }
}

const SudokuPage = () => {
  const [originalPuzzle, setOriginalPuzzle] = useState(createGrid);
  const [grid, setGrid] = useState([]);
  const [isSolving, setIsSolving] = useState(false);
  const aiSpeedRef = useRef(defaultAnimationSpeed);

  const [aiSelectedCell, setAiSelectedCell] = useState(null);
  const [conflictCells, setConflictCells] = useState(new Set());
  const [aiAnimationSpeed, setAiAnimationSpeed] = useState(defaultAnimationSpeed);

  useEffect(() => {
    setGrid(JSON.parse(JSON.stringify(originalPuzzle)));
  }, [originalPuzzle]);

  const handleChange = (row, col, value) => {
    if (originalPuzzle[row][col] !== 0 || isSolving) return;

    const num = /^[1-9]$/.test(value) ? parseInt(value, 10) : 0;
    const newGrid = [...grid];
    newGrid[row][col] = num;

    setGrid(newGrid);
    const cells = getAllConflictingCells(grid);
    setConflictCells(cells);
  };

  const resetGame = () => {
    setGrid(JSON.parse(JSON.stringify(originalPuzzle)));
    setAiSelectedCell(null);
    setConflictCells(new Set());
  };

  const newGame = () => {
    setOriginalPuzzle(createGrid());
    setAiSelectedCell(null);
    setConflictCells(new Set());
  };

 const solveWithAI = async (aiGrid, row, col) => {
    if (row === 9) {
        setIsSolving(false);
        return true;
    }
    const nextCol = (col+1)%9;
    const nextRow = nextCol === 0? row+1: row;
    if (aiGrid[row][col] !== 0) {
        return solveWithAI(aiGrid, nextRow, nextCol);
    }
    for(let num = 1; num <= 9; num++) {
        aiGrid[row][col] = num;
        setGrid(JSON.parse(JSON.stringify(aiGrid)));
        const conflicts = getAllConflictingCells(aiGrid);
        setConflictCells(conflicts);
        setAiSelectedCell([row,col])
        await new Promise(resolve => setTimeout(resolve, aiSpeedRef.current))
        if (conflicts.size === 0) {
            if (await solveWithAI(aiGrid, nextRow, nextCol)) {
                return true;
            }
        }
    }
    aiGrid[row][col] = 0;
    setGrid(JSON.parse(JSON.stringify(aiGrid)));
    setConflictCells(new Set());
    return false;
 }

  return (
    <PlaygroundLayout 
      title="Sudoku AI Solver - Interactive Playground"
      description="Solve Sudoku puzzles interactively with AI, watch real-time animations, and play along!">
        <div className="sudoku-container">
            <h2>Sudoku Challenge</h2>
            <div className="sudoku-grid">
                {grid.length > 0 &&
                grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isConflict = conflictCells.has(`${rowIndex},${colIndex}`);
                        const isAiSelected = aiSelectedCell && aiSelectedCell[0] === rowIndex && aiSelectedCell[1] === colIndex;

                    return (
                        <input
                        key={`${rowIndex}-${colIndex}`}
                        type="text"
                        maxLength="1"
                        value={cell === 0 ? "" : cell}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        className={`
                            ${originalPuzzle[rowIndex][colIndex] !== 0 ? "preset" : ""}
                            ${isConflict ? "conflict" : ""}
                            ${isAiSelected ? "ai-selected" : ""}
                        `}
                        />
                    );
                    })
                )}
            </div>
            {isSolving && (<div>
            <input type="range" min={minAnimationSpeed} max={maxAnimationSpeed} value={aiAnimationSpeed} onChange={(e) => {
                const speed = parseInt(e.target.value);
                setAiAnimationSpeed(speed);
                aiSpeedRef.current = 500-speed;
            }} />
            <p>Animation Speed</p>
            </div>)}

            <div className="sudoku-buttons">
                <button onClick={resetGame} disabled={isSolving}>Reset</button>
                <button onClick={newGame} disabled={isSolving}>New Game</button>
                <button onClick={() => {setIsSolving(true); solveWithAI(JSON.parse(JSON.stringify(grid)), 0,0);}} disabled={isSolving}>Solve with AI</button>
            </div>
        
        </div>
    </PlaygroundLayout>
  );
};

export default SudokuPage;
