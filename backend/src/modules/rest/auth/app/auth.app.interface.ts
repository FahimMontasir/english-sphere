import { TimezoneName } from 'countries-and-timezones';

export type IReq = {
  token: string;
  fcmToken: { token: string; device: string };
  timezone: TimezoneName;
};
