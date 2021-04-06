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
    const ref = this(timestamp, zone);
    if (ref.hour() === hour && ref.minute() === minute) {
      tzs.push(zone);
    }
  }
  return tzs;
}
