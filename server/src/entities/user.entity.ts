import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "User"
})
export class UserEntity {
    @PrimaryGeneratedColumn()
	id: number;

    @Index()
	@Column()
	name: string;

	@Index()
	@Column({unique: true})
	email: string;

	@Index()
	@Column()
	password: string;
}