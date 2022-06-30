import { ActivityEnum, Attachment } from "../entities/Activity";

export const validDate = (x: any) => {
  return !!x ? new Date(x).toISOString() : undefined;
};

export const validText = (x: string) => {
  return !!x ? x : undefined;
};

export const validActivityType = (x: ActivityEnum) => {
  return Object.values(ActivityEnum).includes(x) ? x : undefined;
};

export const validAttachments = (x: Attachment[]) => {
  const validKeys = ["id", "name"];
  const isValid = (aKeys: string[]) =>
    aKeys.every((val) => validKeys.includes(val));
  return x.every((a) => isValid(Object.keys(a))) ? x : undefined;
};

export const definedOnly = (o: any) => {
  return Object.fromEntries(Object.entries(o).filter(([_, v]) => v != null));
};
