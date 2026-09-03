import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonProgress } from './entities/lesson-progress.entity';
import { CourseEnrollment } from '../course-enrollments/entities/course-enrollment.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(CourseEnrollment)
    private readonly enrollmentsRepository: Repository<CourseEnrollment>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) { }

  async create(dto: CreateLessonProgressDto, userId: string): Promise<LessonProgress> {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id: dto.enrollmentId },
      relations: { student: true },
    });
    if (!enrollment) {
      throw new NotFoundException(`Inscripción con id ${dto.enrollmentId} no encontrada`);
    }

    // Evita que un usuario reporte progreso sobre la inscripción de otro
    if (enrollment.student.id !== userId) {
      throw new ForbiddenException('Esta inscripción no te pertenece');
    }

    const lesson = await this.lessonsRepository.findOne({
      where: { id: dto.lessonId },
    });
    if (!lesson) {
      throw new NotFoundException(`Lección con id ${dto.lessonId} no encontrada`);
    }

    const existing = await this.lessonProgressRepository.findOne({
      where: { enrollment: { id: dto.enrollmentId }, lesson: { id: dto.lessonId } },
    });
    if (existing) {
      throw new ConflictException('Ya existe un registro de progreso para esta lección');
    }

    const completed = dto.completed ?? false;

    const progress = this.lessonProgressRepository.create({
      enrollment,
      lesson,
      completed,
      completedAt: completed ? new Date() : null,
    });

    return this.lessonProgressRepository.save(progress);
  }

  async findAll(): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.find({
      relations: { enrollment: true, lesson: true },
    });
  }

  async findAllByEnrollment(enrollmentId: string): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.find({
      where: { enrollment: { id: enrollmentId } },
      relations: { lesson: true },
    });
  }

  async findOne(id: string): Promise<LessonProgress> {
    const progress = await this.lessonProgressRepository.findOne({
      where: { id },
      relations: { enrollment: { student: true }, lesson: true },
    });

    if (!progress) {
      throw new NotFoundException(`Registro de progreso con id ${id} no encontrado`);
    }

    return progress;
  }

  async update(id: string, dto: UpdateLessonProgressDto, userId: string): Promise<LessonProgress> {
    const progress = await this.findOne(id);

    if (progress.enrollment.student.id !== userId) {
      throw new ForbiddenException('Esta inscripción no te pertenece');
    }

    const completed = dto.completed ?? progress.completed;

    Object.assign(progress, {
      completed,
      completedAt: completed ? (progress.completedAt ?? new Date()) : null,
    });

    return this.lessonProgressRepository.save(progress);
  }

  async remove(id: string): Promise<void> {
    const progress = await this.findOne(id);
    await this.lessonProgressRepository.remove(progress);
  }
}