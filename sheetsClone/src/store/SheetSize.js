import { atom } from "recoil";

export const SheetSizeState = atom({
    key:'SheetSizeState',
    default:{
        width: 900,
        height:950
    }
})