/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as moment from "moment-timezone";
import { extend, forLocalTime } from "../src/index";
import { forLocalTime as _forLocalTime } from "../src/moment-timezone-for-local-time";
jest.mock("../src/moment-timezone-for-local-time");
import { DataCtx, newYear2000UTC1 } from "./data";

extend(moment);

it("should extend throw if given object not in shape of moment", () => {
  expect(() => extend(null as any)).toThrow(
    "The given object doesn't have a 'tz' property. Make sure to import moment-timezone before extending momentjs with moment-timezone-for-local-time."
  );
});

it("should extend modify moment so that exports.forLocalTime === moment.tz.forLocalTime", () => {
  expect(moment.tz.forLocalTime).toBe(forLocalTime);
});

describe("moment.tz.fromLocalTime:", () => {
  // It's easier to mock Date instead of setting the node timezone
  // on Unix it's easy but on Windows we need to change system's timezone

  let data: DataCtx;
  let now: Date;
  let dateOG: DateConstructor;

  beforeAll(() => {
    data = newYear2000UTC1();
    dateOG = global.Date;
    global.Date = (class extends Date {
      public static now() {
        return data.timestamp;
      }
      constructor() {
        super(data.isoString);
      }
      public getHours() {
        return data.localtime.hour;
      }
      public getMinutes() {
        return data.localtime.minute;
      }
      public getTime() {
        return data.timestamp;
      }
      public valueOf() {
        return data.timestamp;
      }
    } as unknown) as DateConstructor;
  });

  beforeEach(() => {
    now = new Date();
  });

  it("when no args given, should call the internal with current system local time", () => {
    moment.tz.forLocalTime();
    expect(_forLocalTime).toHaveBeenCalledTimes(1);
    expect(_forLocalTime).toHaveBeenCalledWith(
      now.getHours(),
      now.getMinutes(),
      now.getTime()
    );
  });

  describe("timestamp should defaults to current system time when argument is", () => {
    it("null", () => {
      moment.tz.forLocalTime(5, 0, null);
      expect(_forLocalTime).toHaveBeenCalledTimes(1);
      expect(_forLocalTime).toHaveBeenCalledWith(5, 0, now.getTime());
    });

    it("undefined", () => {
      moment.tz.forLocalTime(5, 0, undefined);
      expect(_forLocalTime).toHaveBeenCalledTimes(1);
      expect(_forLocalTime).toHaveBeenCalledWith(5, 0, now.getTime());
    });
  });

  it("timestamp can be either be a Date, number or moment and should the return value should be the same whatever the argument type", () => {
    const curried = (timestamp: Parameters<typeof forLocalTime>[2]) =>
      moment.tz.forLocalTime(now.getHours(), now.getMinutes(), timestamp);
    const expected = curried(now.getTime()); // number
    expect(curried((moment as any)(data.timestamp))).toEqual(expected); // moment instance
    expect(curried(now)).toEqual(expected); // Date
  });

  afterAll(() => {
    global.Date = dateOG;
  });
});

describe("moment.tz.fromLocalTime: should throw when", () => {
  it("hour is not a number", () => {
    expect(() => {
      moment.tz.forLocalTime("foo" as any, 0);
    }).toThrow("hour arg must be a number and in [0,23]. You gave foo.");
    expect(() => {
      moment.tz.forLocalTime(null as any, 0);
    }).toThrow(
      "hour arg must be a number and in [0,23]. You gave null or undefined."
    );
  });
  it("hour not in valid range (> 23)", () => {
    expect(() => {
      moment.tz.forLocalTime(24, 0);
    }).toThrow("hour arg must be a number and in [0,23]. You gave 24.");
  });
  it("hour not in valid range (< 0)", () => {
    expect(() => {
      moment.tz.forLocalTime(-1, 0);
    }).toThrow("hour arg must be a number and in [0,23]. You gave -1.");
  });
  it("minute is not a number", () => {
    expect(() => {
      moment.tz.forLocalTime(0, "foo" as any);
    }).toThrow("minute arg must be a number and in [0,59]. You gave foo.");
    expect(() => {
      moment.tz.forLocalTime(0, null as any);
    }).toThrow(
      "minute arg must be a number and in [0,59]. You gave null or undefined."
    );
  });
  it("minute not in valid range (> 23)", () => {
    expect(() => {
      moment.tz.forLocalTime(0, 60);
    }).toThrow("minute arg must be a number and in [0,59]. You gave 60.");
  });
  it("minute not in valid range (< 0)", () => {
    expect(() => {
      moment.tz.forLocalTime(0, -1);
    }).toThrow("minute arg must be a number and in [0,59]. You gave -1.");
  });
});
