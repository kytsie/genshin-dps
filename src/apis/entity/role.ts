import { EntityModel } from "@midwayjs/orm";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@EntityModel("role")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 10,
  })
  name: string;

  @Column()
  avatar: string;

  @Column()
  wikiUrl: string;

  @Column("int")
  elementType: number; // TODO 元素类型表

  @Column("float")
  elementBreakPercentage: number;

  @Column("int")
  elementBreakCoolDown: number;

  @Column()
  elementBreakExplain: string;

  @CreateDateColumn()
  ctime: string;

  @DeleteDateColumn()
  dtime: string;

  @UpdateDateColumn()
  utime: string;
}
