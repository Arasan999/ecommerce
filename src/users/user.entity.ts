import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRolesEnum } from "./types/roles.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: UserRolesEnum, default: UserRolesEnum.GHOST })
    role: UserRolesEnum;

    @Column({ default: '' })
    profile: string;
}