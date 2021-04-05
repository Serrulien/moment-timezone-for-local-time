/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @internal
 * @see {moment.MomentTimezone.forLocalTime}
 */
export function forLocalTime(
  this: any,
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
