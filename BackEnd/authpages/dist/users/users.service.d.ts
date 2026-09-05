import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(registerDto: RegisterDto): Promise<Partial<User>>;
    findByEmail(email: string): Promise<User | null>;
    updatePassword(email: string, newPassword: string): Promise<boolean>;
    findAll(): Promise<Partial<User>[]>;
}
