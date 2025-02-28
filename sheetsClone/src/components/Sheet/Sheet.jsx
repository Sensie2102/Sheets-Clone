import React from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import Cell, { CELL_WIDTH, CELL_HEIGHT } from "../Cell/Cell";
import { SheetSizeState } from "../../store/SheetSize";
import { useRecoilValue } from "recoil";

const Sheet = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfColumns = sheetSize.width / CELL_WIDTH;
  const numberOfRows = sheetSize.height / CELL_HEIGHT;
  return (
    <table>
      <tbody>
        {[...Array(numberOfRows)].map((row, rowIndex) => (
          <Row key={rowIndex}>
            {[...Array(numberOfColumns)].map((col, colIndex) => (
              <Column key={colIndex}>
                <Cell />
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
