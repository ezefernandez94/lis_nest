import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    // This is only due to no DB connected yet
    private users = [
        {
            "id": 1,
            "name": "Gerardo",
            "email": "gerardo@mail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Paula",
            "email": "paula@mail.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Ezequiel",
            "email": "ezequiel@mail.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "Guadalupe",
            "email": "guadalupe@mail.com",
            "role": "SALES"
        },
        {
            "id": 5,
            "name": "Mateo",
            "email": "mateo@mail.com",
            "role": "INTERN"
        },
    ]

    findAll(role?: 'INTERN' | 'SALES' | 'ENGINEER' | 'ADMIN') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role)
            
            if(rolesArray.length === 0) throw new NotFoundException('No users found with that role')

            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User not found')

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [... this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id:usersByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser)

        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removeUser
    }

}
