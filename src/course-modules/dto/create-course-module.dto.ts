import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsInt, Min, MaxLength } from 'class-validator';

export class CreateCourseModuleDto {
    @ApiProperty({ example: 'Módulo 1: Fundamentos', description: 'Título del módulo' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID del curso al que pertenece el módulo',
    })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Posición del módulo dentro del curso. Si se omite, se agrega al final.',
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    order?: number;
}