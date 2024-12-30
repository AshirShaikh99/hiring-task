import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("todos")
export class TodoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: "due_date",
    type: "date",
    nullable: true,
  })
  dueDate: Date;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
