# Moment timezone for local time

Get all matching timezones given a local time and a timestamp.  
Moment-timezone-for-local-time is a Moment.js plugin.

```js
// Given a timestamp, for which timezones is the local time 03:00 ?
moment.tz.forLocalTime(3, 0, new Date("2000-01-01T00:00:00Z"));
// -> ["Africa/Algiers", ..., "Europe/Paris", ...]
```

## Installation

In browser:

```html
<script src="https://unpkg.com/moment-timezone-for-local-time"></script>
<!-- Plugin is then available at window.momentTimezoneForLocalTime -->
```

In Node:

```bash
npm install moment-timezone-for-local-time
```

```js
import * as momentTzForLocalTime from "moment-timezone-for-local-time"; // ES Modules
const momentTzForLocalTime = require("moment-timezone-for-local-time"); // CommonJS
```

You may need to install moment-timezone if not already installed.

## Version compatibility

Indicates the version to use according your moment-timezone version.

| moment-timezone | moment-timezone-for-local-time | notes                                              |
| --------------- | ------------------------------ | -------------------------------------------------- |
| >= 0.5.29       | 1.0.0                          | use at least moment 2.15.0 to avoid type conflicts |
| >= 0.2.0        | 0.1.1                          |
| 0.1.0           | 0.1.0                          |

## Setup

Let's extend the moment instance

```js
import * as moment from "moment-timezone";
momentTzForLocalTime.extend(moment); // Adds moment.tz.forLocalTime function
moment.tz.forLocalTime();
```

It's also possible to not extend the moment instance

```js
const forLocalTime = momentTzForLocalTime.forLocalTime.bind(moment.tz);
forLocalTime();
```

## Usage

```js
// fn(hour, minute, timestamp)
forLocalTime(3, 0, new Date("2000-01-01T00:00:00Z"));
forLocalTime(3, 0, new Date("2000-01-01T00:00:00Z").getTime());
forLocalTime(3, 0, moment("2000-01-01T00:00:00Z"));
// The above 3 calls are equal

// timestamp defaults to Date.now()
forLocalTime(10, 30);

// List all timezones with the same local time as current system
forLocalTime();
```

Returns an array of timezone identifiers e.g. `["Africa/Algiers", ..., "Europe/Paris", ...]`.  
The returned array can be empty when local time and timestamp don't match any timezone.

A `RangeError` will be thrown when:

- hour isn't in \[0, 23\]
- minute isn't in \[0, 59\]

Decimals will be floored.

```js
// The below calls are equal
forLocalTime(3.9, 0.9, 0.9);
forLocalTime(3, 0, 0);
```

The result of calls to `forLocalTime` depends on timezone data loaded into moment. Make sure you load the right dataset for your use (e.g. 10 year range, 1970-2030, ...).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Dev

Fullfill the peer dependency if npm doesn't install it for you.

```bash
npm install --no-save moment-timezone@version
```

for `version` refer to package.json#peerDependencies.moment-timezone.

## License

[MIT](https://choosealicense.com/licenses/mit/)
