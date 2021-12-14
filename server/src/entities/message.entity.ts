import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
    name: "Message"
})
export class MessageEntity {
    @PrimaryGeneratedColumn()
	id: number;

    @Index()
	@Column()
	text: string;

	@Index()
	@Column()
	senderId: number;

	@Index()
	@Column()
	receivedId: number;

    @ManyToOne(type => UserEntity, user => user.id) 
    user: UserEntity
}