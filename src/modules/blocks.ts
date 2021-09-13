import { atom } from "jotai";

export const startAtom = atom(1);
export const startReadAtom = atom((get) => get(startAtom));

export const startBlockReadWriteAtom = atom(
  (get) => get(startAtom),
  (_get, set, num: number) => set(startAtom, num)
);

export const endAtom = atom(40000);
export const endReadAtom = atom((get) => get(endAtom));

export const endBlockReadWriteAtom = atom(
  (get) => get(endAtom),
  (_get, set, num: number) => set(endAtom, num)
);
