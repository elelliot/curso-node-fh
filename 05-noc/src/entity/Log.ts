import { Entity, Column } from "typeorm";
export enum Level {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Entity()
export class Log {
  @Column()
  message!: string;

  @Column()
  origin!: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
  })
  level!: Level;

  @Column()
  createdAt!: Date;
}
