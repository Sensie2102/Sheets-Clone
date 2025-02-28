import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CellValueState } from "../../store/CellValueState";
import classes from "./Cell.module.css";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

const Cell = (props) => {
  const [cellValue, setCellValue] = useRecoilState(
    CellValueState(props.cellId)
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);

  const changeLabelToInput = (event) => {
    event.stopPropagation();
    setIsEditMode(true);
  };

  const changeInputToLabel = () => setIsEditMode(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [onClickOutsideEventInputHandler]);

  return isEditMode ? (
    <input
      className={classes.CellInput}
      ref={inputRef}
      data-cell-id={props.cellId}
      value={cellValue}
      onChange={updateCellValueState}
    />
  ) : (
    <div
      className={classes.CellLabel}
      data-cell-id={props.cellId}
      onClick={changeLabelToInput}
    >
      {cellValue}
    </div>
  );
};

export default Cell;
