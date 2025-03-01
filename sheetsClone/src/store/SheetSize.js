import { atom } from "recoil";

export const SheetSizeState = atom({
    key:'SheetSizeState',
    default:{
        width: 2500,
        height:950
    }
})