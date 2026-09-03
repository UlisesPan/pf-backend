import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

interface GoogleUserPayload {
    googleId: string;
    email: string;
    name: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) throw new ConflictException('El email ya está registrado');

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: dto.password, // ya no se hashea acá, lo hace UsersService
        });

        return this.buildToken(user);
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        if (!user.passwordHash) {
            throw new UnauthorizedException(
                'Esta cuenta inicia sesión con Google. Usá el botón "Continuar con Google".',
            );
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatches) throw new UnauthorizedException('Credenciales inválidas');

        return this.buildToken(user);
    }

    async loginWithGoogle(googleUser: GoogleUserPayload) {
        let user = await this.usersRepository.findOne({
            where: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
        });

        if (!user) {
            // Primer login con Google: se crea el usuario sin contraseña propia
            user = this.usersRepository.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.googleId,
                passwordHash: null,
            });
            user = await this.usersRepository.save(user);
        } else if (!user.googleId) {
            // Ya existía con email/password normal: vinculamos la cuenta de Google
            user.googleId = googleUser.googleId;
            user = await this.usersRepository.save(user);
        }

        return this.buildToken(user);
    }

    private buildToken(user: { id: string; email: string; role: string }) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, role: user.role },
        };
    }
}