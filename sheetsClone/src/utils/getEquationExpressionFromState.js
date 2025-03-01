import { cellIdtoMatrixIndices } from "./cellToMatrixIndices";
import { CellValueState } from "../store/CellValueState";

const parseRange = (range) => {
    const [start, end] = range.split(":");
    if (!start || !end) return [];

    const { row: startRow, column: startCol } = cellIdtoMatrixIndices(start);
    const { row: endRow, column: endCol } = cellIdtoMatrixIndices(end);

    const cells = [];
    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            const colLetter = String.fromCharCode(65 + col); // Convert 0 = A, 1 = B
            const cellId = `${colLetter}${row + 1}`;
            cells.push(cellId);
        }
    }
    return cells;
};

const fetchCellValue = (getState, cellId) => {
    const { row, column } = cellIdtoMatrixIndices(cellId);
    const value = getState(CellValueState(`${row},${column}`)) || "";
    console.log(`Fetching value for cell ${cellId} (key ${row},${column}):`, value);
    return value;
};

export const getEquationExpressionFromState = (
    getState,
    expression,
    notAllowedCellsIds = []
) => {
    if (notAllowedCellsIds.some(cellId => expression.includes(cellId))) {
        return "!ERROR: Circular reference detected";
    }

    console.log(`Processing formula: ${expression}`);

    const functionRegex = /^(SUM|AVG|MAX|MIN|COUNT|TRIM|UPPER|LOWER|REMOVE_DUPLICATES|FIND_AND_REPLACE)\(([^)]+)\)$/i;
    const functionMatch = expression.match(functionRegex);

    if (functionMatch) {
        const [, func, argsString] = functionMatch;
        const args = argsString.split(",").map(arg => arg.trim());

        switch (func.toUpperCase()) {

            case "TRIM":
            case "UPPER":
            case "LOWER": {
                if (args.length !== 1) {
                    return `!ERROR: ${func} expects exactly 1 argument (single cell).`;
                }
                if (args[0].includes(":")) {
                    return `!ERROR: ${func} does not support ranges.`;
                }
                return processSingleCellFunction(func, args[0], getState);
            }

            case "REMOVE_DUPLICATES": {
                if (args.length !== 1 || !args[0].includes(":")) {
                    return "!ERROR: REMOVE_DUPLICATES expects exactly 1 range argument.";
                }
                return processRemoveDuplicates(args[0], getState);
            }

            case "FIND_AND_REPLACE": {
                if (args.length !== 3) {
                    return "!ERROR: FIND_AND_REPLACE expects exactly 3 arguments (range, findText, replaceText).";
                }
                const [range, findText, replaceText] = args;
                if (!range.includes(":")) {
                    return "!ERROR: FIND_AND_REPLACE expects a range as the first argument.";
                }
                return processFindAndReplace(range, findText, replaceText, getState);
            }

            case "SUM":
            case "AVG":
            case "MAX":
            case "MIN":
            case "COUNT": {
                if (args.length !== 1 || !args[0].includes(":")) {
                    return `!ERROR: ${func} expects exactly 1 range argument.`;
                }
                return processRangeFunction(func, args[0], getState);
            }

            default:
                return `!ERROR: Unsupported function ${func}`;
        }
    }

    // Handle simple expressions with cell references (e.g., A1 + B2)
    const cellMatches = Array.from(expression.matchAll(/[A-Z]+[0-9]+/gi));
    const cellValues = cellMatches.map(match => match[0]).map(cellId => {
        const value = fetchCellValue(getState, cellId);
        return { cellId, value };
    });

    const evaluatedExpression = cellValues.reduce(
        (finalExpression, { cellId, value }) =>
            finalExpression.replaceAll(cellId, value.toString()),
        expression
    );

    return `(${evaluatedExpression})`;
};

const processSingleCellFunction = (func, cellId, getState) => {
    const value = String(fetchCellValue(getState, cellId) || "");

    console.log(`Processing ${func} for cell ${cellId} with value: '${value}'`);

    switch (func) {
        case "TRIM":
            return value.trim();
        case "UPPER":
            
            return value.toUpperCase();
        case "LOWER":
            console.log(value.toUpperCase())
            return value.toLowerCase();
        default:
            return "!ERROR";
    }
};

const processRangeFunction = (func, range, getState) => {
    const cells = parseRange(range);
    const values = cells.map(cellId => parseFloat(fetchCellValue(getState, cellId)) || 0);

    console.log(`Processing ${func} for cell ${range} with value: '${values}'`);
    switch (func.toUpperCase()) {
        case "SUM":
            return values.reduce((a, b) => a + b, 0);
        case "AVG":
            return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        case "MAX":
            return Math.max(...values);
        case "MIN":
            return Math.min(...values);
        case "COUNT":
            return values.filter(v => !isNaN(v)).length;
        default:
            return "!ERROR";
    }
};

const processRemoveDuplicates = (range, getState) => {
    const cells = parseRange(range);
    const uniqueValues = new Set(cells.map(cellId => fetchCellValue(getState, cellId)));

    return Array.from(uniqueValues).join(", ");
};

const processFindAndReplace = (range, findText, replaceText, getState) => {
    const cells = parseRange(range);
    const results = cells.map(cellId =>
        fetchCellValue(getState, cellId).replaceAll(findText, replaceText)
    );

    return results.join(", ");
};
