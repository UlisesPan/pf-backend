import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    IsNumber,
    Min,
    MaxLength,
    IsUrl,
    IsIn,
} from 'class-validator';

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

    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID de la categoría a la que pertenece el curso',
    })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @ApiPropertyOptional({ example: 49.99, description: 'Precio del curso' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiPropertyOptional({
        example: 'beginner',
        enum: ['beginner', 'intermediate', 'advanced'],
        description: 'Nivel del curso',
    })
    @IsOptional()
    @IsIn(['beginner', 'intermediate', 'advanced'])
    level?: string;

    @ApiPropertyOptional({
        example: 'https://cdn.miapp.com/covers/curso-nestjs.png',
        description: 'URL de la imagen de portada',
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}