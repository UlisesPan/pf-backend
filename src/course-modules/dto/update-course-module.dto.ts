import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCourseModuleDto } from './create-course-module.dto';

export class UpdateCourseModuleDto extends PartialType(CreateCourseModuleDto) {
    @ApiPropertyOptional({
        description: 'Título del módulo (opcional)',
        example: 'Fundamentos de Programación Avanzada',
        minLength: 3,
        maxLength: 100,
    })
    title?: string;

    @ApiPropertyOptional({
        description: 'Descripción del módulo (opcional)',
        example: 'En este módulo profundizaremos en conceptos avanzados de programación',
        maxLength: 500,
    })
    description?: string;

    @ApiPropertyOptional({
        description: 'ID del curso (opcional)',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    })
    courseId?: string;

    @ApiPropertyOptional({
        description: 'Orden del módulo (opcional)',
        example: 2,
        minimum: 0,
    })
    order?: number;

    @ApiPropertyOptional({
        description: 'Duración estimada en minutos (opcional)',
        example: 60,
        minimum: 1,
    })
    durationMinutes?: number;

    @ApiPropertyOptional({
        description: 'URL del video (opcional)',
        example: 'https://www.youtube.com/watch?v=xyz789',
        format: 'url',
    })
    videoUrl?: string;

    @ApiPropertyOptional({
        description: 'Estado del módulo (opcional)',
        example: false,
        default: true,
    })
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'Recursos adicionales (opcional)',
        example: ['https://ejemplo.com/guia-avanzada.pdf'],
        type: [String],
    })
    resources?: string[];
}