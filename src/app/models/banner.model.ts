export interface Entities {
  name: string;
  channelId: string;
  language: string;
  zoneId: string;
  priority: number;
  fileId: string;
  url: string;
  startDate: Date;
  endDate?: Date;
  active: boolean;
  labels: string[];
}

export interface Banner {
  total: number;
  entities: Entities[];
}
