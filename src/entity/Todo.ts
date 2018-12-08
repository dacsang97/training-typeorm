import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  AfterInsert,
} from 'typeorm'
import { Validate, Length } from 'class-validator'
import CapitalLetterValidator from '../validator/CapitalLetterValidator'

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

  @AfterInsert()
  public handleAfterInsert() {
    console.log(`INSERTED TODO WITH ID: ${this.id}`)
  }
}
