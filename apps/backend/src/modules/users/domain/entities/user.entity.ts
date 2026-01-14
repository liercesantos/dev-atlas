export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string | null,
    public readonly role: 'USER' | 'ADMIN',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly password?: string,
  ) {}
}
