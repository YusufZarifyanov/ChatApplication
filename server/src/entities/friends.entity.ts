// import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { UserEntity } from "./user.entity";

// @Entity({
//     name: "Friend"
// })
// export class FriendEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Index()
//     @Column()
//     userId: number;

//     @Index()
//     @Column()
//     friendId: number;

//     @ManyToOne(type => UserEntity, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' },)
//     user: UserEntity;

//     @ManyToOne(type => UserEntity, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' },)
//     friend: UserEntity;
// }