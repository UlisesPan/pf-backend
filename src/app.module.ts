import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { CourseModulesModule } from './course-modules/course-modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonProgressModule } from './lesson-progress/lesson-progress.module';
import { CourseEnrollmentsModule } from './course-enrollments/course-enrollments.module';

@Module({
  imports: [UsersModule, CategoriesModule, CoursesModule, CourseModulesModule, LessonsModule, LessonProgressModule, CourseEnrollmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
