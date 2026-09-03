import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsDateString } from 'class-validator';

export class UpdateCourseEnrollmentDto {
    @ApiPropertyOptional({
        example: 45,
        description: 'Porcentaje de avance del curso (0-100)',
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    progressPercent?: number;

    @ApiPropertyOptional({
        example: '2026-09-03T12:00:00.000Z',
        description: 'Fecha de finalización del curso',
    })
    @IsOptional()
    @IsDateString()
    completedAt?: string;
}