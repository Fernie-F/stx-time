import { atom, Setter, WritableAtom } from "jotai";
import { getCalculatedDate, getDefaultTz } from "../util/timeTools";

const setCalculatedDate = (
  set: Setter,
  blockHeight: number,
  atom: WritableAtom<any, any>
) => {
  getCalculatedDate(blockHeight)
    .then((calculatedDate: CalculatedDate) => {
      set(atom, calculatedDate);
    })
    .catch((e) => console.log("Server is unavailable or wrong URL!"));
};

export interface CalculatedDate {
  date: Date;
  estimated: boolean;
}

export const timezoneAtom = atom(getDefaultTz());
export const timezoneWriteAtom = atom(
  (get) => get(timezoneAtom),
  (_get, set, newTimezone: string) => set(timezoneAtom, newTimezone)
);

export const startDateTimeAtom = atom<CalculatedDate>({
  date: new Date(),
  estimated: false,
});

export const writeStartDateTimeAtom = atom(
  (get) => get(startDateTimeAtom),
  (_get, set, newTime: CalculatedDate) => set(startDateTimeAtom, newTime)
);
export const writeStartDateTimeFromBlockAtom = atom(
  (get) => get(writeStartDateTimeAtom),
  (_get, set, blockHeight: number) => {
    setCalculatedDate(set, blockHeight, writeStartDateTimeAtom);
  }
);

export const endDateTimeAtom = atom<CalculatedDate>({
  date: new Date(),
  estimated: false,
});
export const writeEndDateTimeAtom = atom(
  (get) => get(endDateTimeAtom),
  (_get, set, newTime: CalculatedDate) => set(endDateTimeAtom, newTime)
);
export const writeEndDateTimeFromBlockAtom = atom(
  (get) => get(writeEndDateTimeAtom),
  (_get, set, blockHeight: number) => {
    setCalculatedDate(set, blockHeight, writeEndDateTimeAtom);
  }
);
