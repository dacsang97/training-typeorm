import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  AfterInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Validate, Length } from 'class-validator'
import CapitalLetterValidator from '../validator/CapitalLetterValidator'
import { TodoMetadata } from './TodoMetadata'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number

  @Length(0, 10)
  @Validate(CapitalLetterValidator)
  public name: string = ''

  @Column('character varying', {
    name: 'name',
    nullable: false,
  })
  public persistedName: string = ''

  @Index()
  @Column()
  public isComplete: boolean = false

  @OneToOne(() => TodoMetadata)
  @JoinColumn()
  public metadata: TodoMetadata

  @AfterInsert()
  public handleAfterInsert() {
    console.log(`INSERTED TODO WITH ID: ${this.id}`)
  }
}
