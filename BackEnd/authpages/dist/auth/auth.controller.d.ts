import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        statusCode: number;
        message: string;
        data: Partial<import("../users/entities/user.entity").User>;
    }>;
    login(loginDto: LoginDto): Promise<{
        statusCode: number;
        message: string;
        accessToken: string;
        user: {
            id: string;
            fullName: string;
            email: string;
        };
    }>;
    verifyEmail(forgotPasswordDto: ForgotPasswordDto): Promise<{
        statusCode: number;
        message: string;
        email: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        statusCode: number;
        message: string;
    }>;
}
