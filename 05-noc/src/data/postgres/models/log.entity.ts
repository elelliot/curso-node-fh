import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
export enum Level {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Entity({name:'Logs'})
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 150,
  })
  message!: string;

  @Column({
    length: 50,
  })
  origin!: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  level!: Level;

  @Column()
  createdAt!: Date;
}
