import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../DTOs/create-user-dto';
import bcrypt from 'bcryptjs'
import { UpdateUserDto } from '../DTOs/update-user-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const {
            firstName,
            lastName,
            email,
            Password,
            mobile,
            role
        } = createUserDto;

        const hashedPassword = bcrypt.hash(Password, 10);

        const user = this.UserRepository.create({
            email,
            password: hashedPassword,
            role,
        });

        await this.UserRepository.save(user);

        return user;

    }

    async findOneBy(where: Partial<User>): Promise<User | null> {
        const user = this.UserRepository.findOneBy(where)

        return user;
    }


    async update(id: number, updateuserDto: UpdateUserDto) {
        const { password, profile } = updateuserDto;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await this.UserRepository.update({ id }, { ...(hashedPassword && { password: hashedPassword }), ...(profile && { profile }) });

        return updatedUser;
    }

    async remove(id: number) {
        await this.UserRepository.delete({ id });
    }
}
