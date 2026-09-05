import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        statusCode: number;
        message: string;
        data: Partial<import("./entities/user.entity").User>[];
    }>;
}
