import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCourseModuleDto } from './create-course-module.dto';

// No se permite reasignar un módulo a otro curso vía update
export class UpdateCourseModuleDto extends PartialType(
    OmitType(CreateCourseModuleDto, ['courseId'] as const),
) { }