import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CellValueState } from "../../store/CellValueState";
import classes from "./Cell.module.css";
import { CellFormatState } from "../../store/CellFormatState";
import { EvaluatedCellValueState } from "../../store/EvaluatedCellValueState";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

const Cell = (props) => {
  const [cellValue, setCellValue] = useRecoilState(
    CellValueState(props.cellId)
  );
  const evaluatedCellValue = useRecoilValue(
    EvaluatedCellValueState(props.cellId)
  );
  const [format] = useRecoilState(CellFormatState(props.cellId));
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);

  const changeLabelToInput = (event) => {
    event.stopPropagation();
    setIsEditMode(true);
    
    props.onSelect?.(props.cellId);
  };

  const changeInputToLabel = () => setIsEditMode(false);

  const onClickOutsideEventInputHandler = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      changeInputToLabel();
    }
  };

  const updateCellValueState = (event) => {
    setCellValue(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutsideEventInputHandler);
    return () => {
      document.removeEventListener("click", onClickOutsideEventInputHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cellStyle = {
    fontWeight: format.bold ? "bold" : "normal",
    fontStyle: format.italic ? "italic" : "normal",
    fontSize: `${format.fontSize}px`,
    color: format.color,
  };

  return isEditMode ? (
    <input
      className={classes.CellInput}
      ref={inputRef}
      data-cell-id={props.cellId}
      value={cellValue}
      onChange={updateCellValueState}
      style={cellStyle}
    />
  ) : (
    <div
      className={classes.CellLabel}
      data-cell-id={props.cellId}
      onClick={changeLabelToInput}
      style={cellStyle}
    >
      {cellValue.startsWith("=") ? evaluatedCellValue : cellValue}
    </div>
  );
};

export default Cell;
