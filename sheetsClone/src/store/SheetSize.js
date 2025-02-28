import { atom } from "recoil";

export const SheetSizeState = atom({
    key:'SheetSizeState',
    default:{
        width: 1900,
        height:950
    }
})