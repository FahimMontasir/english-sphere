import { TimezoneName } from 'countries-and-timezones';

export type IReq = {
  token: string;
  fcmToken: string;
  timezone: TimezoneName;
};
