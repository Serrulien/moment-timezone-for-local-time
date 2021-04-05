export interface DataCtx {
  date: Date;
  isoString: string;
  localtime: {
    hour: number;
    minute: number;
  };
  timestamp: number;
  timezones: string[];
}

export function newYear2000UTC1(): DataCtx {
  const isoString = "2000-01-01T00:00:00Z";
  const date = new Date(isoString);
  const localtime = { hour: 1, minute: 0 };
  /** in ms */
  const timestamp = 946684800000;
  // For each following timezone, localtime for 2000-01-01T00:00:00Z is 01:00
  // Daylight Saving Time rules:
  // - EU, W-Eur, E-Eur, C-Eur -> Mar last Sun, Oct last Sun
  // - WAT no DST, UTC+1 constant
  const timezones = [
    "Africa/Algiers", // EU
    "Africa/Bangui", // WAT
    "Africa/Brazzaville", // WAT
    "Africa/Ceuta", // EU
    "Africa/Douala", // WAT
    "Africa/Kinshasa", // WAT
    "Africa/Lagos", // WAT
    "Africa/Libreville", // WAT
    "Africa/Luanda", // WAT
    "Africa/Malabo", // WAT
    "Africa/Ndjamena", // WAT
    "Africa/Niamey", // WAT
    "Africa/Porto-Novo", // WAT
    "Africa/Tunis", // EU
    "Arctic/Longyearbyen", // EU
    // "Atlantic/Jan_Mayen", // EU
    "CET", // EU
    "Etc/GMT-1", // none
    "Europe/Amsterdam", // EU
    "Europe/Andorra", // EU
    "Europe/Belgrade", // EU
    "Europe/Berlin", // EU
    "Europe/Bratislava", // EU
    "Europe/Brussels", // EU
    "Europe/Budapest", // EU
    "Europe/Busingen", // EU
    "Europe/Copenhagen", // EU
    "Europe/Gibraltar", // EU
    // "Europe/Ljubljana", // EU
    "Europe/Luxembourg", // EU
    "Europe/Madrid", // EU
    "Europe/Malta", // EU
    "Europe/Monaco", // EU
    // "Europe/Oslo", // EU
    "Europe/Paris", // EU
    // "Europe/Podgorica", // EU
    // "Europe/Prague", // EU
    "Europe/Rome", // EU
    // "Europe/San_Marino", // EU
    // "Europe/Sarajevo", // EU
    // "Europe/Skopje", // EU
    "Europe/Stockholm", // EU
    "Europe/Tirane", // EU
    // "Europe/Vaduz", // EU
    // "Europe/Vatican", // EU
    "Europe/Vienna", // EU
    "Europe/Warsaw", // EU
    // "Europe/Zagreb", // EU
    // "Europe/Zurich", // EU
    "MET", // none
    // "Poland", // EU
  ];
  return { date, timezones, localtime, timestamp, isoString };
}
