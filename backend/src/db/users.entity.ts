import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true }) 
    email: string

    @Column({ unique: true }) 
    username: string

    @Column({ name: 'display_name', nullable: true }) 
    name: string

    @Column({ select: false }) 
    password: string
}