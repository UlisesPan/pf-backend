import { IsString, IsOptional, IsNumber, Min, MaxLength, MinLength, IsUUID, IsPositive, IsBoolean, IsArray, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseModuleDto {
    @ApiProperty({
        description: 'Título del módulo del curso',
        example: 'Introducción a la Programación',
        minLength: 3,
        maxLength: 100,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada del módulo',
        example: 'En este módulo aprenderás los fundamentos básicos de la programación',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty({
        description: 'ID del curso al que pertenece este módulo',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    })
    @IsUUID('4', { message: 'El ID del curso debe ser un UUID válido' })
    courseId: string;

    @ApiPropertyOptional({
        description: 'Orden del módulo dentro del curso',
        example: 1,
        minimum: 0,
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({
        description: 'Duración estimada del módulo en minutos',
        example: 45,
        minimum: 1,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    durationMinutes?: number;

    @ApiPropertyOptional({
        description: 'URL del video introductorio del módulo',
        example: 'https://www.youtube.com/watch?v=abc123',
        format: 'url',
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL del video debe ser válida' })
    videoUrl?: string;

    @ApiPropertyOptional({
        description: 'Estado del módulo (activo/inactivo)',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'Recursos adicionales del módulo (PDF, enlaces, etc.)',
        example: ['https://ejemplo.com/guia.pdf', 'https://ejemplo.com/recurso-extra'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true, message: 'Cada recurso debe ser una URL válida' })
    resources?: string[];
}