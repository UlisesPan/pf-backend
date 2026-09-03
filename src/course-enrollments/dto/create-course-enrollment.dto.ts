import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCourseEnrollmentDto {
    @ApiProperty({
        example: 'b3f1c2a0-1234-4a5b-9abc-1234567890ab',
        description: 'ID del curso al que se inscribe el estudiante',
    })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}