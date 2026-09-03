import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateLessonProgressDto {
    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID de la lección sobre la que se registra el progreso',
    })
    @IsUUID()
    @IsNotEmpty()
    lessonId: string;

    @ApiPropertyOptional({
        example: false,
        description: 'Indica si la lección fue completada',
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @ApiPropertyOptional({
        example: 75,
        description: 'Porcentaje de avance dentro de la lección (0-100)',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    progressPercentage?: number;
}