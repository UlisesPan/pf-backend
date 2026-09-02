import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Nombre completo del usuario (requerido)',
        example: 'María González Pérez',
        minLength: 2,
        maxLength: 100,
        required: true,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Correo electrónico válido del usuario',
        example: 'maria.gonzalez@empresa.com',
        format: 'email',
        maxLength: 255,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña segura (mínimo 6 caracteres, debe incluir mayúsculas, minúsculas y números)',
        example: 'SecurePass123',
        format: 'password',
        minLength: 6,
        maxLength: 50,
        writeOnly: true,
        required: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número',
    })
    password: string;
}