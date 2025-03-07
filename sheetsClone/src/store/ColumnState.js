import { atomFamily } from "recoil"

export const columnState = atomFamily({
    key:'columnWidth',
    default: 100
})