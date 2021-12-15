import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FriendEntity } from "./friends.entity";
import { MessageEntity } from "./message.entity";

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

	@OneToMany(type => FriendEntity, friend => friend.userId) 
	user: FriendEntity[];  

	@OneToMany(type => FriendEntity, friend => friend.friendId) 
	friend: FriendEntity[];  

	@OneToMany(type => MessageEntity, message => message.receivedId)
	userReceivedMessages: MessageEntity[]

	@OneToMany(type => MessageEntity, message => message.senderId)
	userSendMessages: MessageEntity[]
}