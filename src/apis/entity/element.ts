import { EntityModel } from "@midwayjs/orm";
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@EntityModel("element")
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  color: string;

  @CreateDateColumn()
  ctime: string;

  @DeleteDateColumn()
  dtime: string;

  @UpdateDateColumn()
  utime: string;
}
