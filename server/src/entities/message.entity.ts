// import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { UserEntity } from "./user.entity";

// @Entity({
// 	name: "Message"
// })
// export class MessageEntity {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Index()
// 	@Column()
// 	text: string;

// 	@Index()
// 	@Column()
// 	senderId: number;

// 	@Index()
// 	@Column()
// 	receivedId: number;

// 	@CreateDateColumn({ name: 'created_at' })
// 	created_at: Date;

// 	@ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
// 	sender: UserEntity;

// 	@ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
// 	received: UserEntity;
// }