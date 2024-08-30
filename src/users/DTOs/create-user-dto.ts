import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UserRolesEnum } from "../types/roles.enum";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @IsOptional()
    mobile?: string = '';

    @IsNotEmpty()
    @MinLength(10)
    Password

    @IsEnum(UserRolesEnum)
    @IsOptional()
    role?: UserRolesEnum = UserRolesEnum.CUSTOMER;
}