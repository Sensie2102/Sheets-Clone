import React from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import classes from "./Sheet.module.css";
import Cell, { CELL_WIDTH, CELL_HEIGHT } from "../Cell/Cell";
import { SheetSizeState } from "../../store/SheetSize";
import { useRecoilValue } from "recoil";
import Resizer from "../Resizer/Resizer";

const Sheet = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfColumns = Math.floor(sheetSize.width / CELL_WIDTH);
  const numberOfRows = Math.floor(sheetSize.height / CELL_HEIGHT);
  return (
    <div className={classes.SheetWrapper}>
      <table className={classes.Sheet}>
        <tbody>
          {[...Array(numberOfRows)].map((row, rowIndex) => (
            <Row key={rowIndex}>
              {[...Array(numberOfColumns)].map((col, colIndex) => (
                <Column key={colIndex}>
                  <Cell cellId={`${rowIndex},${colIndex}`} />
                </Column>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
      <Resizer />
    </div>
  );
};

export default Sheet;
