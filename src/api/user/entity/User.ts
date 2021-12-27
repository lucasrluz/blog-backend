import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;

  @IsEmail({}, { message: 'Email must be an email' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
