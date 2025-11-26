export enum Category {
  LENGTH = 'LENGTH',
  TEMPERATURE = 'TEMPERATURE',
}

export enum Unit {
  METER = 'm',
  FEET = 'ft',
  INCH = 'in',
  KILOMETER = 'km',
  MILE = 'mi',
  CELSIUS = '°C',
  FAHRENHEIT = '°F',
}


export interface ConversionResult {
  value: string;
  unit: Unit;
}