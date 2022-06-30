import { ActivityInput } from "src/entities/Activity";

export const dateDiff = (options: Partial<ActivityInput>) => {
  return options.startTime && options.endTime
    ? (new Date(options.endTime).getTime() -
        new Date(options.startTime).getTime()) /
        1000
    : undefined;
};
