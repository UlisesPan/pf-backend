import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) { }

  @Post()
  create(@Body() createLessonProgressDto: CreateLessonProgressDto, userId: string) {
    return this.lessonProgressService.create(createLessonProgressDto, userId);
  }

  @Get()
  findAll() {
    return this.lessonProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonProgressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonProgressDto: UpdateLessonProgressDto, userId: string) {
    return this.lessonProgressService.update(id, updateLessonProgressDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonProgressService.remove(id);
  }
}
