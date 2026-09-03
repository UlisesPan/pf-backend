import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    MaxLength,
    IsUrl,
    IsEnum,
} from 'class-validator';
import { CourseDifficulty } from '../entities/course.entity';

export class CreateCourseDto {
    @ApiProperty({ example: 'Introducción a NestJS', description: 'Título del curso' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @ApiPropertyOptional({
        example: 'Curso práctico para construir APIs REST con NestJS y TypeORM.',
        description: 'Descripción del curso',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        enum: CourseDifficulty,
        example: CourseDifficulty.BEGINNER,
        description: 'Nivel de dificultad del curso',
        default: CourseDifficulty.BEGINNER,
    })
    @IsOptional()
    @IsEnum(CourseDifficulty)
    difficulty?: CourseDifficulty;

    @ApiPropertyOptional({
        example: 'https://cdn.campuslite.com/covers/curso-nestjs.png',
        description: 'URL de la imagen de portada',
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID de la categoría a la que pertenece el curso',
    })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;
}