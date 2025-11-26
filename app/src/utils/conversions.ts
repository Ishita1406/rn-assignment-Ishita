import { Unit } from '../types';

const formatNumber = (num: number): string => {
  if (!Number.isFinite(num)) return '';
  return parseFloat(num.toFixed(4)).toString();
};


export const convertTemperature = (value: number, from: Unit): number => {
  if (from === Unit.CELSIUS) {
    // Celsius to Fahrenheit
    return (value * 9) / 5 + 32;
  } else {
    // Fahrenheit to Celsius
    return ((value - 32) * 5) / 9;
  }
};

export const convertLength = (value: number, from: Unit, to: Unit): number => {
  let valueInMeters: number;

  // Convert from source unit to meters
  switch (from) {
    case Unit.METER:
      valueInMeters = value;
      break;
    case Unit.FEET:
      valueInMeters = value / 3.28084;
      break;
    case Unit.INCH:
      valueInMeters = value / 39.3701;
      break;
    case Unit.KILOMETER:
      valueInMeters = value * 1000;
      break;
    case Unit.MILE:
      valueInMeters = value * 1609.34;
      break;
    default:
      valueInMeters = value;
  }

  // Convert meters to target unit
  switch (to) {
    case Unit.METER:
      return valueInMeters;
    case Unit.FEET:
      return valueInMeters * 3.28084;
    case Unit.INCH:
      return valueInMeters * 39.3701;
    case Unit.KILOMETER:
      return valueInMeters / 1000;
    case Unit.MILE:
      return valueInMeters / 1609.34;
    default:
      return valueInMeters;
  }
};

export const calculateConversion = (inputValue: string, from: Unit, to: Unit): string => {
  const num = parseFloat(inputValue);
  if (isNaN(num)) return '';

  let result: number;

  if ([Unit.METER, Unit.FEET, Unit.INCH, Unit.KILOMETER, Unit.MILE].includes(from)) {
    result = convertLength(num, from, to);
  } else {
    result = from === Unit.CELSIUS ? (num * 9) / 5 + 32 : ((num - 32) * 5) / 9;
  }

  return parseFloat(result.toFixed(4)).toString();
};

export default {
    calculateConversion,
    convertTemperature,
    convertLength,
};
