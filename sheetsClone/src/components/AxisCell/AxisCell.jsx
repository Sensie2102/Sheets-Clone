import React from "react";
import { useRecoilValue } from "recoil";
import { columnState } from "../../store/ColumnState";
import classes from "./AxisCell.module.css";

const AxisCell = ({
  columnIndex,
  isColHeader,
  updateSheetSize,
  children,
}) => {
  const maxWidth = useRecoilValue(columnState(columnIndex)); 

  const handleDoubleClick = () => {
    if (isColHeader) {
      // console.log("being double clicked")
      applyColumnWidth(columnIndex, maxWidth);
      updateSheetSize(); 
    }
  };

  const applyColumnWidth = (columnIndex, newWidth) => {
    const columnSelector = `td:nth-child(${columnIndex + 2}), th:nth-child(${
      columnIndex + 2
    })`;
    const columnCells = document.querySelectorAll(columnSelector);

    columnCells.forEach((cell) => {
      cell.style.width = `${newWidth}px`;
    });
  };

  return (
    <th className={classes.AxisCell} onDoubleClick={handleDoubleClick}>
      {children}
    </th>
  );
};

export default AxisCell;
