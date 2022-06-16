import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const TableContainer = (props) => {
  const { items } = props;

  return (
    <table className="table">
      <TableHeader />
      {items.map((item) => (
        <TableBody
          key={item.id}
          author={item.author}
          title={item.title}
          isbn={item.isbn}
        />
      ))}
    </table>
  );
};

export default TableContainer;
