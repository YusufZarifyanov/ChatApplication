import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Friend"
})
export class FriendEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    userId: number;

    @Index()
    @Column()
    friendId: number;
}