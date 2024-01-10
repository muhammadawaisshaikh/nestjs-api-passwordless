import { IsEmail } from "class-validator";

export class PasswordLessLoginDto {
    @IsEmail()
    destination: string;
}