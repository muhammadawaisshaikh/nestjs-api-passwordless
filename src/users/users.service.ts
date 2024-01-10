import { Injectable } from '@nestjs/common';
import { User } from './user.entity'

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id:1,
            name:'Anil',
            email: 'anil@gmail.com',
        },
        {
            id:2,
            name:'Ajay',
            email: 'ajay@gmail.com',
        }
    ];

    findOneByEmail(email: string) : User | undefined {
        return this.users.find(user => user.email == email);
    }
}
