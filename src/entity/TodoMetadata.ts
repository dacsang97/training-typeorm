import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TodoMetadata {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public comment: string = ''
}
