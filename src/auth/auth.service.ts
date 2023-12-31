import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Loan } from '../loan/schemas/loan.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel('Loan')
        private loanModel: Model<Loan>,
        private jwtService: JwtService,
    ) {}
    async userExists(userId: string): Promise<boolean> {
        const user = await this.userModel.findById(userId).exec();
        return !!user;
    }
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;

        // Criptografa a senha antes de armazenar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // Gera e assina um token JWT com o ID do usuário
        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
    async getUserLoans(userId: string): Promise<Loan[]> {
        // Recupera os empréstimos com base no ID do usuário
        const loans = await this.loanModel.find({ user: userId }).exec();

        return loans;
    }
}
