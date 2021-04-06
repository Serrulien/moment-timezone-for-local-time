import * as moment from "moment-timezone";
import { forLocalTime as _forLocalTime } from "../src/moment-timezone-for-local-time";
import { newYear2000UTC1 } from "./data";

type OmitThisArg<F> = F extends (this: never, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

const forLocalTime = _forLocalTime.bind(moment.tz) as OmitThisArg<
  typeof _forLocalTime
>;

it("distant from DST transition", () => {
  const data = newYear2000UTC1();
  expect(
    forLocalTime(
      data.localtime.hour,
      data.localtime.minute,
      data.date.getTime()
    )
  ).toEqual(data.timezones);
});

/*
  We're going to use Europe/Paris
  IANA tzdb 2021a:

  # Zone  NAME          STDOFF  RULES	  FORMAT	[UNTIL]
    Zone  Europe/Paris  1:00    France  CE%sT	  1977
                        1:00    EU      CE%sT

  # Rule  NAME  FROM  TO   -  IN   ON       AT     SAVE  LETTER/S
    Rule  EU    1981  max  -  Mar  lastSun  1:00u  1:00  S
    Rule  EU    1996  max  -  Oct  lastSun  1:00u  0	-
*/

describe("Forward DST transition", () => {
  it("before transition", () => {
    const timestamp = new Date("2000-03-26T01:00:00Z").getTime() - 1;
    const res = forLocalTime(1, 59, timestamp);
    expect(res).toContain("Europe/Paris");
  });

  describe("should not contain the timezone when localtime is invalid (inside transition gap)", () => {
    it("at start", () => {
      const ref = new Date("2000-03-26T01:00:00Z");
      const res = forLocalTime(2, 0, ref.getTime());
      expect(res).not.toContain("Europe/Paris");
    });

    it("inside", () => {
      const ref = new Date("2000-03-26T01:00:00Z");
      const res = forLocalTime(2, 30, ref.getTime());
      expect(res).not.toContain("Europe/Paris");
    });
  });

  it("wall clock after transition", () => {
    const ref = new Date("2000-03-26T01:00:00Z");
    const res = forLocalTime(3, 0, ref.getTime());
    expect(res).toContain("Europe/Paris");
  });
});

it("should return empty array when localtime doesn't match with any timezone", () => {
  expect(
    forLocalTime(23, 59, new Date("2000-01-01T00:00:00Z").getTime())
  ).toEqual([]);
});

describe("Fallback DST transition", () => {
  it("overlap start", () => {
    const ref = new Date("2000-10-29T00:00:00Z");
    const res = forLocalTime(2, 0, ref.getTime());
    expect(res).toContain("Europe/Paris");
  });

  it("inside overlap", () => {
    const ref = new Date("2000-10-29T00:30:00Z");
    const res = forLocalTime(2, 30, ref.getTime());
    expect(res).toContain("Europe/Paris");
  });

  it("overlap end", () => {
    const ref = new Date("2000-10-29T01:00:00Z");
    const res = forLocalTime(2, 0, ref.getTime());
    expect(res).toContain("Europe/Paris");
  });

  it("invalid", () => {
    const ref = new Date("2000-10-29T01:00:00Z");
    const res = forLocalTime(3, 0, ref.getTime());
    expect(res).not.toContain("Europe/Paris");
  });
});

describe("should floor decimals", () => {
  it("hour arg", () => {
    const data = newYear2000UTC1();
    expect(
      forLocalTime(
        data.localtime.hour + 0.9,
        data.localtime.minute,
        data.date.getTime()
      )
    ).toEqual(
      forLocalTime(
        data.localtime.hour,
        data.localtime.minute,
        data.date.getTime()
      )
    );
  });

  it("minute arg", () => {
    const data = newYear2000UTC1();
    expect(
      forLocalTime(
        data.localtime.hour,
        data.localtime.minute + 0.9,
        data.date.getTime()
      )
    ).toEqual(
      forLocalTime(
        data.localtime.hour,
        data.localtime.minute,
        data.date.getTime()
      )
    );
  });

  it("timestamp arg", () => {
    const data = newYear2000UTC1();
    expect(
      forLocalTime(
        data.localtime.hour + 0.9,
        data.localtime.minute,
        data.date.getTime() + 0.9
      )
    ).toEqual(
      forLocalTime(
        data.localtime.hour,
        data.localtime.minute,
        data.date.getTime()
      )
    );
  });
});
