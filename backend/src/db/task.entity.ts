import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({type: "int"})
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name:"user_id"})
    user: User

    @Column({type: "varchar"})
    title: string

    @Column({type: "text"})
    content: string

    @CreateDateColumn({type: "datetime"})
    datetime: Date
}