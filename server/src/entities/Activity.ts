import { Entity, Enum, Property } from "@mikro-orm/core";
import { BaseEntity } from "./Base";

export interface ActivityInput {
  firmId: number;
  type: string;
  name?: string;
  startTime?: string;
  endTime?: string;
  elapsedTime?: number;
  attachments?: Attachment[];
}

export interface Attachment {
  id: number;
  name: string;
}

export enum ActivityEnum {
  DOCUMENT = "document",
  APPOINTMENT = "appointment",
  EMAIL = "email",
  PHONECALL = "phonecall",
}

@Entity()
export class Activity extends BaseEntity {
  @Property({ nullable: true })
  firmId!: number;

  @Enum(() => ActivityEnum)
  type!: ActivityEnum;

  @Property({ nullable: true })
  startTime?: Date;

  @Property({ nullable: true })
  endTime?: Date;

  @Property({ nullable: true })
  elapsedTime?: Number;

  @Property({ type: "text", nullable: true })
  name?: string;

  @Property({ type: "json", nullable: true })
  attachments?: { id: number; name: string }[];
}
