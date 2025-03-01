import React, { useState } from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import classes from "./Sheet.module.css";
import Cell, { CELL_WIDTH, CELL_HEIGHT } from "../Cell/Cell";
import { SheetSizeState } from "../../store/SheetSize";
import { useRecoilValue } from "recoil";
import Resizer from "../Resizer/Resizer";
import AxisCell from "../AxisCell/AxisCell";
import { numberToChar } from "../../utils/numberToChar";
import FormattingToolbar from "../FormattingToolbar/FormattingToolbar";

const Sheet = () => {
  const sheetSize = useRecoilValue(SheetSizeState);
  const [selectedCellId, setSelectedCellId] = useState(null);

  const handleCellSelect = (cellId) => {
    setSelectedCellId(cellId);
  };

  const numberOfColumns = Math.floor(sheetSize.width / CELL_WIDTH);
  const numberOfRows = Math.floor(sheetSize.height / CELL_HEIGHT);

  return (
    <div className={classes.SheetOuterWrapper}>
      <FormattingToolbar selectedCellId={selectedCellId} />

      <div className={classes.SheetInnerWrapper}>
        <table className={classes.Sheet}>
          <tbody>
            <Row>
              {[...Array(numberOfColumns + 1)].map((_, columnIndex) =>
                columnIndex !== 0 ? (
                  <AxisCell key={columnIndex}>
                    {numberToChar(columnIndex - 1)}
                  </AxisCell>
                ) : (
                  <AxisCell key={columnIndex} />
                )
              )}
            </Row>

            {[...Array(numberOfRows)].map((_, rowIndex) => (
              <Row key={rowIndex}>
                <AxisCell>{rowIndex + 1}</AxisCell>
                {[...Array(numberOfColumns)].map((_, columnIndex) => (
                  <Column key={columnIndex}>
                    <Cell
                      cellId={`${rowIndex},${columnIndex}`}
                      onSelect={handleCellSelect}
                    />
                  </Column>
                ))}
              </Row>
            ))}
          </tbody>
        </table>
      </div>
      <Resizer />
    </div>
  );
};

export default Sheet;
