import React from "react";

const Board = ({ board, onClick }) => {
  return (
    <div style={styles.board}>
      {board.map((cell, index) => (
        <div
          key={index}
          style={styles.cell}
          onClick={() => onClick(index)} // Pass the index of the clicked cell
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

const styles = {
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gap: "5px",
  },
  cell: {
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default Board;
