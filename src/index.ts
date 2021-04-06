import moment from "moment-timezone";
import { forLocalTime as _forLocalTime } from "./moment-timezone-for-local-time";

declare module "moment" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace tz {
    /**
     * List all timezones with the same local time as current system.
     *
     * @returns list of timezone identifiers
     * @author [moment-timezone-for-local-time](https://github.com/Serrulien/moment-timezone-for-local-time)
     */
    function forLocalTime(): string[];
    /**
     * List all timezones with the same local time for a given timestamp.
     *
     * @param timestamp defaults to Date.now()
     * @returns list of timezone identifiers
     * @throws {RangeError} when hour isn't in [0, 23] or minute isn't in [0, 59]
     * @author [moment-timezone-for-local-time](https://github.com/Serrulien/moment-timezone-for-local-time)
     */
    function forLocalTime(
      hour: number,
      minute: number,
      timestamp?: moment.Moment | Date | number | null
    ): string[];
  }
}

/**
 * List all timezones with the same local time as current system.
 *
 * @returns list of timezone identifiers
 * @author [moment-timezone-for-local-time](https://github.com/Serrulien/moment-timezone-for-local-time)
 */
export function forLocalTime(this: typeof moment.tz): string[];
/**
 * List all timezones with the same local time for a given timestamp.
 *
 * @param timestamp defaults to Date.now()
 * @returns list of timezone identifiers
 * @throws {RangeError} when hour isn't in [0, 23] or minute isn't in [0, 59]
 * @author [moment-timezone-for-local-time](https://github.com/Serrulien/moment-timezone-for-local-time)
 */
export function forLocalTime(
  this: typeof moment.tz,
  hour: number,
  minute: number,
  timestamp?: moment.Moment | Date | number | null
): string[];
export function forLocalTime(
  this: typeof moment.tz,
  hour?: number,
  minute?: number,
  timestamp?: moment.Moment | Date | number | null
): string[] {
  if (arguments.length === 0) {
    const now = new Date();
    return _forLocalTime.call(
      this,
      now.getHours(),
      now.getMinutes(),
      now.getTime()
    );
  }
  if (timestamp === undefined || timestamp === null) {
    timestamp = Date.now();
  }
  if (typeof hour !== "number" || 23 < hour || hour < 0) {
    throw new TypeError(
      `hour arg must be a number and in [0,23]. You gave ${
        hour?.toString() || "null or undefined"
      }.`
    );
  }
  if (typeof minute !== "number" || 59 < minute || minute < 0) {
    throw new TypeError(
      `minute arg must be a number and in [0,59]. You gave ${
        minute?.toString() || "null or undefined"
      }.`
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return _forLocalTime.call(this, hour, minute, timestamp.valueOf());
}

export function extend(momentJS: typeof moment): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!momentJS?.tz) {
    throw new Error(
      "The given object doesn't have a 'tz' property. Make sure to import moment-timezone before extending momentjs with moment-timezone-for-local-time."
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  momentJS.tz.forLocalTime = forLocalTime;
}
