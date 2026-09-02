import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CourseEnrollmentsController } from './course-enrollments.controller';
import { CourseEnrollment } from './entities/course-enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEnrollment])],
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService],
})
export class CourseEnrollmentsModule { }