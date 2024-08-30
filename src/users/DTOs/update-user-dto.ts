import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { UserRolesEnum } from "../types/roles.enum";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    profile?: string;
}
