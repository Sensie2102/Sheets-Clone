import { charToNumber } from "./charToNumber";

export const cellIdtoMatrixIndices = (cellId) => {
    const matchCol = cellId.match(/[A-Z]+/);
    const columnLetters = matchCol ? matchCol[0] : null;
    
    const columnNumber = charToNumber(columnLetters);

    const matchRow = cellId.match(/[0-9]+/);
    const rowNumber = matchRow ? parseInt(matchRow[0]) - 1 : null; 


  return {
    column: columnNumber,
    row: rowNumber,
  };
};