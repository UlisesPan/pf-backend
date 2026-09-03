import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    @InjectRepository(CourseEnrollment)
    private readonly enrollmentsRepository: Repository<CourseEnrollment>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(dto: CreateCourseEnrollmentDto, studentId: string): Promise<CourseEnrollment> {
    const course = await this.coursesRepository.findOne({
      where: { id: dto.courseId },
    });
    if (!course) {
      throw new NotFoundException(`Curso con id ${dto.courseId} no encontrado`);
    }

    const student = await this.usersRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Usuario con id ${studentId} no encontrado`);
    }

    const alreadyEnrolled = await this.enrollmentsRepository.findOne({
      where: { student: { id: studentId }, course: { id: dto.courseId } },
    });
    if (alreadyEnrolled) {
      throw new ConflictException('Ya estás inscripto en este curso');
    }

    const enrollment = this.enrollmentsRepository.create({ student, course });
    return this.enrollmentsRepository.save(enrollment);
  }

  async findAll(): Promise<CourseEnrollment[]> {
    return this.enrollmentsRepository.find({
      relations: { student: true, course: true },
      order: { enrolledAt: 'DESC' },
    });
  }

  async findAllByStudent(studentId: string): Promise<CourseEnrollment[]> {
    return this.enrollmentsRepository.find({
      where: { student: { id: studentId } },
      relations: { course: true },
      order: { enrolledAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<CourseEnrollment> {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id },
      relations: { student: true, course: true, lessonProgress: true },
    });

    if (!enrollment) {
      throw new NotFoundException(`Inscripción con id ${id} no encontrada`);
    }

    return enrollment;
  }

  async update(id: string, dto: UpdateCourseEnrollmentDto): Promise<CourseEnrollment> {
    const enrollment = await this.findOne(id);

    Object.assign(enrollment, {
      progressPercent: dto.progressPercent ?? enrollment.progressPercent,
      completedAt: dto.completedAt ? new Date(dto.completedAt) : enrollment.completedAt,
    });

    return this.enrollmentsRepository.save(enrollment);
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentsRepository.remove(enrollment);
  }
}