import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  name!: string | null;

  @ApiProperty({ enum: ['USER', 'EDITOR', 'ADMIN'] })
  role!: 'USER' | 'EDITOR' | 'ADMIN';

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  refreshToken?: string | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
