import { Column, Entity, Index } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Index()
    @Column({
        nullable: true,
    })
    name: string

    @Index()
    @Column({ unique: true })
    phone: string

    @Index()
    @Column()
    password: string

    @Index()
    @Column({ unique: true })
    email: string
}
