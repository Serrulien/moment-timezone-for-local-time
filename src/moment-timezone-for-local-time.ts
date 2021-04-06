import moment from "moment-timezone";
/**
 * @internal
 * @see {moment.MomentTimezone.forLocalTime}
 */
export function forLocalTime(
  this: typeof moment.tz,
  hour: number,
  minute: number,
  timestamp: number
): string[] {
  hour = Math.floor(hour);
  minute = Math.floor(minute);
  const tzs: string[] = [];
  const zones = this.names();
  for (const zone of zones) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = this(timestamp as any, zone);
    if (ref.hour() === hour && ref.minute() === minute) {
      tzs.push(zone);
    }
  }
  return tzs;
}
