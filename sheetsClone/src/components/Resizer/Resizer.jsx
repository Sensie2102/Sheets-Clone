import React, { useEffect } from "react";
import classes from "./Resizer.module.css";
import { useRecoilState } from "recoil";
import { SheetSizeState } from "../../store/SheetSize";
const Resizer = () => {
  // eslint-disable-next-line no-unused-vars
  const [sheetSize, setSheetSize] = useRecoilState(SheetSizeState);

  const initDrag = () => {
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };
  const doDrag = (event) => {
    const pointerX = event.pageX;
    const pointerY = event.pageY;

    setSheetSize({
      width: pointerX,
      height: pointerY,
    });
  };
  const stopDrag = () => {
    document.removeEventListener("mousemove", doDrag);
    document.removeEventListener("mouseup", stopDrag);
  };
  useEffect(() => {});
  return <div onMouseDown={initDrag} className={classes.Resizer}></div>;
};

export default Resizer;
