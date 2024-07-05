// src/PaginatedCombinations.tsx
import React, { useState, useEffect } from 'react';
import { getCombinations } from './combinations';

const COMBINATIONS_PER_PAGE = 100; // Adjust as needed

const PaginatedCombinations: React.FC = () => {
  const [combinations, setCombinations] = useState<number[][]>([]);
  const [page, setPage] = useState(0);
  const [generator, setGenerator] = useState<Generator<number[]>>();

  useEffect(() => {
    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
    const comboLength = 6; // You can change this to any desired length
    setGenerator(getCombinations(numbers, comboLength));
  }, []);

  useEffect(() => {
    if (!generator) return;

    const newCombinations: number[][] = [];
    let result = generator.next();
    let count = 0;

    while (!result.done && count < (page + 1) * COMBINATIONS_PER_PAGE) {
      if (count >= page * COMBINATIONS_PER_PAGE) {
        newCombinations.push(result.value);
      }
      result = generator.next();
      count++;
    }

    setCombinations(newCombinations);
  }, [page, generator]);

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(Math.max(page - 1, 0));

  return (
    <div>
      <h1>Number Combinations</h1>
      <ul>
        {combinations.map((combo, index) => (
          <li key={index}>{combo.join(', ')}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={combinations.length < COMBINATIONS_PER_PAGE}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedCombinations;
