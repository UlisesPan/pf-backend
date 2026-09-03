import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { CourseEnrollment } from '../../course-enrollments/entities/course-enrollment.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('lesson_progress')
@Unique(['enrollment', 'lesson'])
export class LessonProgress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => CourseEnrollment, (enrollment) => enrollment.course, { onDelete: 'CASCADE' })
    enrollment: CourseEnrollment;

    @ManyToOne(() => Lesson, (lesson) => lesson.progressRecords, { onDelete: 'CASCADE' })
    lesson: Lesson;

    @Column({ default: false })
    completed: boolean;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt: Date;
}