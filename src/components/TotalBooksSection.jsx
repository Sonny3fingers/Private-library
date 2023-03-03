import React, { useState, useCallback, useEffect } from "react";

const TotalBooksSection = ({ items }) => {
  const [totalBooks, setTotalBooks] = useState(`${items.length}`);
  const [averageRate, setAverageRate] = useState(0);

  useEffect(() => {
    setTotalBooks(items.length);
    setAverageRate(
      (
        items.reduce(
          (prevValue, currentValue) => prevValue + currentValue.rating,
          0
        ) / items.length
      ).toFixed(1)
    );
  }, [items]);

  return (
    <div className="totalBooksSection">
      <div>
        <div className="totalBooks">
          <span>Total Books</span>
          <span>{totalBooks}</span>
        </div>
        <div className="averageRating">
          <span>Average Rating</span>
          <span>{averageRate}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalBooksSection;
