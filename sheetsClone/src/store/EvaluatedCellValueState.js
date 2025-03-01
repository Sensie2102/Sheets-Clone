import { selector } from "recoil";
import { memoize } from "../utils/memoize";
import { CellValueState } from "./CellValueState";
import { evaluate } from "mathjs";
import { getEquationExpressionFromState } from "../utils/getEquationExpressionFromState";

export const EvaluatedCellValueState = (cellId) =>
  memoize(`evaluatedCell_${cellId}`, () =>
    selector({
      key: `evaluatedCell_${cellId}`,
      get: ({ get }) => {
        const value = get(CellValueState(cellId))||0;

        if (value.startsWith("=")) {
          try {
            const evaluatedExpression = getEquationExpressionFromState(
              get,
              value.slice(1)
            );

            if (evaluatedExpression === "!ERROR") {
              return "!ERROR";
            }

        
            
            if (typeof evaluatedExpression === "string") {
              return evaluatedExpression;  
          }

            return evaluate(evaluatedExpression);
          // eslint-disable-next-line no-unused-vars
          } catch (error) {
            return value;
          }
        }
        
        return value;
      },
    })
  );
