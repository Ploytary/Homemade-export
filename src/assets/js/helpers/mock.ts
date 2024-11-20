interface RangeOptions {
  year: number;
  monthIndex: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function getRandomDateFromCurrent(
  rangeOptions: Partial<RangeOptions>,
  mode: 'shiftBefore' | 'shiftAfter' = 'shiftBefore'
): Date {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } = rangeOptions;
  const shiftMod = mode === 'shiftBefore' ? -1 : 1;
  const baseDate = new Date();
  const workDate = new Date(baseDate.getTime());

  year && workDate.setFullYear(baseDate.getFullYear() + shiftMod * year);
  monthIndex && workDate.setMonth(baseDate.getMonth() + shiftMod * monthIndex);
  day && workDate.setDate(baseDate.getDate() + shiftMod * day);
  hours && workDate.setHours(baseDate.getHours() + shiftMod * hours);
  minutes && workDate.setMinutes(baseDate.getMinutes() + shiftMod * minutes);
  seconds && workDate.setSeconds(baseDate.getSeconds() + shiftMod * seconds);
  milliseconds && workDate.setMilliseconds(baseDate.getMilliseconds() + shiftMod * milliseconds);

  const rangeInMs = Math.abs(baseDate.getTime() - workDate.getTime());
  return new Date(baseDate.getTime() + shiftMod * Math.round(Math.random() * rangeInMs));
}
