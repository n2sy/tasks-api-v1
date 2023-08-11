import { roleEnum } from 'src/generics/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  email: string;

  @Column({
    length: 30,
  })
  username: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    length: 100,
  })
  salt: string;

  @Column({
    type: 'enum',
    enum: roleEnum,
  })
  role: string;
}
