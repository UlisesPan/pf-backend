import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateLessonProgressDto {
    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID de la inscripción (CourseEnrollment) del usuario al curso',
    })
    @IsUUID()
    @IsNotEmpty()
    enrollmentId: string;

    @ApiProperty({
        example: 'c4a2d3b1-5678-4c6d-8bcd-234567890abc',
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
}