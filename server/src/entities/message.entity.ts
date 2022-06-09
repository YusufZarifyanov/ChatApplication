import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'

@Entity({
    name: 'message',
})
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    text: string

    @Index()
    @Column()
    senderId: number

    @Index()
    @Column()
    receivedId: number

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    sender: User

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    received: User
}
