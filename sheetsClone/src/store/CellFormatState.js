import { atomFamily } from "recoil";

export const CellFormatState = atomFamily({
  key: "CellFormatState",
  default: {
    bold: false,
    italic: false,
    fontSize: 15,
    color: "#000000"
  },
});
