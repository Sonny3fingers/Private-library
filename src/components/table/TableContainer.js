import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const TableContainer = (props) => {
  const { items, onFetchBooks } = props;

  return (
    <table className="table">
      <TableHeader />
      {items.map((item) => (
        <TableBody
          id={item.id}
          key={item.id}
          author={item.author}
          title={item.title}
          date={item.date}
          rating={item.rating}
          onFetchBooks={onFetchBooks}
        />
      ))}
    </table>
  );
};

export default TableContainer;
