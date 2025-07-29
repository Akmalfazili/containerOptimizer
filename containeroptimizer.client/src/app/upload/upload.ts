export interface Upload {
  id: number;
  containerId: string;
  arrival: Date;
  departure: Date;
  destination: string;
  weight: number;
  blockId: number;
  stackPosition: number;
}
