import React from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import classes from "./Sheet.module.css";
import Cell, { CELL_WIDTH, CELL_HEIGHT } from "../Cell/Cell";
import { SheetSizeState } from "../../store/SheetSize";
import { useRecoilValue } from "recoil";
import Resizer from "../Resizer/Resizer";
import AxisCell from "../AxisCell/AxisCell";
import { numberToChar } from "../../utils/numberToChar";

const Sheet = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfColumns = Math.floor(sheetSize.width / CELL_WIDTH);
  const numberOfRows = Math.floor(sheetSize.height / CELL_HEIGHT);
  return (
    <div className={classes.SheetWrapper}>
      <table className={classes.Sheet}>
        <tbody>
          <Row>
            {[...Array(numberOfColumns + 1)].map((column, columnIndex) =>
              columnIndex !== 0 ? (
                <AxisCell key={columnIndex}>
                  {numberToChar(columnIndex - 1)}
                </AxisCell>
              ) : (
                <AxisCell key={columnIndex} />
              )
            )}
          </Row>
          {[...Array(numberOfRows)].map((row, rowIndex) => (
            <Row key={rowIndex}>
              <AxisCell>{rowIndex + 1}</AxisCell>
              {[...Array(numberOfColumns)].map((column, columnIndex) => (
                <Column key={columnIndex}>
                  <Cell cellId={`${rowIndex},${columnIndex}`} />
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
