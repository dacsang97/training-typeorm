import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  AfterInsert,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Validate, Length } from 'class-validator'
import CapitalLetterValidator from '../validator/CapitalLetterValidator'
import { TodoMetadata } from './TodoMetadata'
import { Author } from './Author'

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

  @Index()
  @ManyToOne(() => Author, author => author.todos)
  public author: Author

  @AfterInsert()
  public handleAfterInsert() {
    console.log(`INSERTED TODO WITH ID: ${this.id}`)
  }
}
