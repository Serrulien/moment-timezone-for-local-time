# 1.1.0

- Types update. `namespace tz` becomes `interface MomentTimezone`. That reflects the moment-timezone v0.5.30 definition file.

# 1.0.0

**BREAKING CHANGES:**
The package now use the in-built types of moment-timezone. The type of arguments is narrowed.

- Type of `this` for `forLocaltime` was `any` and is now `typeof moment.tz`.
- Type `extend` now requires a `typeof moment`.

# 0.1.1

- Update tests according to tzdata of moment-timezone 0.2.0.
- (No actual changes otherwise)

# 0.1.0

## Features

- `extend(moment)` method which add the function `forLocalTime` to `moment.tz`.
- `forLocalTime` can be used as a standalone without mutating `moment`.
