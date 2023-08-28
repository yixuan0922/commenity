import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

/*
------ Global User Data ------
*/
export const staticUserDataAtom = atom({
    id: "meta_pres",
    firstName: "YiXuan",
    lastName:"Chan",
    district:"Woodlands"
});