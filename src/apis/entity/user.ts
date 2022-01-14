import { EntityModel } from "@midwayjs/orm";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@EntityModel("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  password: string;

  @Column()
  token: string;

  @CreateDateColumn()
  ctime: string;

  @DeleteDateColumn()
  dtime: string;

  @UpdateDateColumn()
  utime: string;
}
