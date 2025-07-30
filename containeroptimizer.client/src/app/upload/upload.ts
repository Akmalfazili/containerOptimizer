export interface Upload {
  id: number;
  containerId: string;
  arrival: Date;
  departure: Date;
  destination: Country;
  weight: number;
  blockId: number;
  stackPosition: number;
}
interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}
