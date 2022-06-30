import { Activity, ActivityEnum } from "../entities/Activity";

export type ReportActivity = {
  type: ActivityEnum;
  totalElapsedMinutes: number;
  activities: Activity[];
};
