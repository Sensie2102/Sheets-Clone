import { cellIdtoMatrixIndices } from "./cellToMatrixIndices";
import { CellValueState } from "../store/CellValueState";

export const getEquationExpressionFromState = (
  getState,
  expression,
  notAllowedCellsIds = []
) => {
  // Prevent cyclic dependencies: if any notAllowed cell is found in the expression, return an error.
  if (notAllowedCellsIds.some(cellId => expression.includes(cellId))) {
    return "!ERROR";
  }

  // Find all cell ids in the expression.
  const cellMatches = Array.from(expression.matchAll(/[A-Z]+[0-9]+/gi));
  const cellValues = cellMatches
    .map(match => match[0])
    .map(cellId => {
      const { row, column } = cellIdtoMatrixIndices(cellId);
      let value = "";

      try {
        value = getState(CellValueState(`${row},${column}`)) || 0;
        // If value is a string and begins with an equal sign, resolve its inner expression.
        if (typeof value === "string" && value.startsWith("=")) {
          notAllowedCellsIds.push(cellId);
          value = getEquationExpressionFromState(
            getState,
            value.slice(1),
            notAllowedCellsIds
          );
        }
      } catch (error) {
        console.error(`Error processing cell ${cellId}:`, error);
      }

      return {
        cellId,
        value,
      };
    });

  // Replace all occurrences of cell IDs in the expression with their corresponding values.
  const evaluatedExpression = cellValues.reduce(
    (finalExpression, { cellId, value }) =>
      finalExpression.replaceAll(cellId, value.toString()),
    expression
  );

  // Wrap the evaluated expression in parentheses to ensure correct operation priority.
  return `(${evaluatedExpression})`;
};
