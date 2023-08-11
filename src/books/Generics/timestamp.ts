import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class TimeStampEntity {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
