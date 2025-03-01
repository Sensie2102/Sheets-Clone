import { atomFamily } from "recoil";

export const CellFormatState = atomFamily({
  key: "CellFormatState",
  default: {
    bold: false,
    italic: false,
    fontSize: 12,
    color: "#000000"
  },
});
