import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

// No se permite reasignar enrollment ni lesson vía update
export class UpdateLessonProgressDto {
    @ApiPropertyOptional({
        example: true,
        description: 'Marca la lección como completada o no',
    })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}