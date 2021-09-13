import { Block } from "@stacks/blockchain-api-client";
import dayjs, { OpUnitType } from "dayjs";
import { CalculatedDate } from "../modules/time";
import { getBlockUnixTime, getLastBlockHeight } from "./blockchainApi";
import fullTimezones from "../util/timezonesAlternatives.json";

const fTzs = fullTimezones as any;
const DEFAULT_TIMEZONE = "America/New_York";

export const searchTimeZone = (timezone: string) => {
  if (fTzs[timezone]) return fTzs[timezone];
  else {
    return Object.keys(fTzs).filter((key) => {
      if (fTzs[key].otherNames.includes(timezone)) return true;
      return false;
    })[0];
  }
};

export const getDefaultTz = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let foundTimezone: string = searchTimeZone(tz);

  if (foundTimezone) return foundTimezone;
  else return DEFAULT_TIMEZONE;
};

export const apiToLocalUnixTime = (apiUnixTime: number) => {
  return apiUnixTime * 1000;
};

export const localToApiUnixTime = (apiUnixTime: number) => {
  return Math.round(apiUnixTime / 1000);
};

export const unixTimeToDate = (unixTime: number) => {
  return new Date(unixTime);
};

export const diffBetweenDates = (
  startDate: Date,
  endDate: Date,
  unit: OpUnitType
) => {
  return dayjs(endDate).diff(startDate, unit, true);
};

let estimateDateFromBlockHeight = (height: number): Promise<Date> => {
  return getLastBlockHeight().then((block: Block) => {
    let localUnixTime = apiToLocalUnixTime(block.burn_block_time);
    let deltaBlockHeight = height - block.height;
    let deltaTime = deltaBlockHeight * 60 * 10 * 1000; // 10 minutes time

    return new Date(localUnixTime + deltaTime);
  });
};

// assumes time is [tipHeight, tipHeightMax]
export const getCalculatedDate = (
  blockHeight: number
): Promise<CalculatedDate> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let unixTime = await getBlockUnixTime(blockHeight);
        let date = unixTimeToDate(unixTime);
        let estimated = false;
        resolve({ date, estimated });
      } catch (e: any) {
        // handle when you can't find block on the blockchain
        if (e.status === 404) {
          let date = await estimateDateFromBlockHeight(blockHeight);
          let estimated = true;
          resolve({ date, estimated });
        } else {
          reject({});
        }
      }
    })();
  });
};

export interface DeltaTime {
  deltaYears: number;
  deltaMonths: number;
  deltaWeeks: number;
  deltaDays: number;
  deltaHours: number;
  deltaMinutes: number;
}

export const generateDeltaTimes = (
  startDate: Date,
  endDate: Date
): DeltaTime => {
  if (endDate.valueOf() - startDate.valueOf() < 0) {
    return {
      deltaYears: 0,
      deltaMonths: 0,
      deltaWeeks: 0,
      deltaDays: 0,
      deltaHours: 0,
      deltaMinutes: 0,
    };
  }
  let deltaDate = endDate;

  let deltaYears = Math.floor(diffBetweenDates(startDate, deltaDate, "years"));
  deltaDate = dayjs(deltaDate)
    .subtract(Math.floor(deltaYears), "year")
    .toDate();

  let deltaMonths = Math.floor(
    diffBetweenDates(startDate, deltaDate, "months")
  );
  deltaDate = dayjs(deltaDate)
    .subtract(Math.floor(deltaMonths), "month")
    .toDate();

  let deltaWeeks = Math.floor(diffBetweenDates(startDate, deltaDate, "weeks"));
  deltaDate = dayjs(deltaDate)
    .subtract(Math.floor(deltaWeeks), "week")
    .toDate();

  let deltaDays = Math.floor(diffBetweenDates(startDate, deltaDate, "days"));
  deltaDate = dayjs(deltaDate).subtract(Math.floor(deltaDays), "days").toDate();

  let deltaHours = Math.floor(diffBetweenDates(startDate, deltaDate, "hours"));
  deltaDate = dayjs(deltaDate)
    .subtract(Math.floor(deltaHours), "hours")
    .toDate();

  let deltaMinutes = Number(
    diffBetweenDates(startDate, deltaDate, "minutes").toFixed(1)
  );

  return {
    deltaYears,
    deltaMonths,
    deltaWeeks,
    deltaDays,
    deltaHours,
    deltaMinutes,
  };
};
