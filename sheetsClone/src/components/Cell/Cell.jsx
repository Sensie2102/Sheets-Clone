import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { CellValueState } from "../../store/CellValueState";

// eslint-disable-next-line no-unused-vars
const Cell = (props) => {
  const [cellValue, setCellValue] = useRecoilState(CellValueState);
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
      ref={inputRef}
      data-cell-id="2"
      value={cellValue}
      onChange={updateCellValueState}
    />
  ) : (
    <div onClick={changeLabelToInput}>{cellValue}</div>
  );
};

export default Cell;
