import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonProgressService } from './lesson-progress.service';
import { LessonProgressController } from './lesson-progress.controller';
import { LessonProgress } from './entities/lesson-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonProgress])],
  controllers: [LessonProgressController],
  providers: [LessonProgressService],
})
export class LessonProgressModule { }
