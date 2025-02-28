import React, { useEffect, useRef, useState } from "react";


const Cell = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);

  const changeLabelToInput = (event) => {
    event.stopPropagation();
    setIsEditMode(true);
  };

  const changeInputToLabel = () => setIsEditMode(false);

  const onClickOutsideEventInputHandler = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      changeInputToLabel();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutsideEventInputHandler);
    return () => {
      document.removeEventListener("click", onClickOutsideEventInputHandler);
    };
  }, []);

  return isEditMode ? (
    <input ref={inputRef} data-cell-id="2" />
  ) : (
    <div onClick={changeLabelToInput}>{props.children}</div>
  );
};

export default Cell;
