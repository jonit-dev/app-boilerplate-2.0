import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  emitter: string;

  @Column()
  target: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
