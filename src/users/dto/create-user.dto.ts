import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'SALES', 'ENGINEER', 'ADMIN'], {
        message: 'Valid role required'
    })
    role: 'INTERN' | 'SALES' | 'ENGINEER' | 'ADMIN';
}