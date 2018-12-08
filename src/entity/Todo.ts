import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string = ''

  @Index()
  @Column()
  public isComplete: boolean = false
}
