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
        const value = get(CellValueState(cellId));

        if (value.startsWith("=")) {
          try {
            const evalutedExpression = getEquationExpressionFromState(
              get,
              value.slice(1)
            );

            if (evalutedExpression === "!ERROR") {
              return "!ERROR";
            }

            return evaluate(evalutedExpression);
          // eslint-disable-next-line no-unused-vars
          } catch (error) {
            return value;
          }
        }

        return value;
      },
    })
  );
