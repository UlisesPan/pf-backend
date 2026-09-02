import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { CourseEnrollment } from '../../course-enrollments/entities/course-enrollment.entity';

export enum UserRole {
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
    ADMIN = 'admin',
}

export enum UserStatus {
    ACTIVE = 'active',
    BLOCKED = 'blocked',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
    role: UserRole;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @OneToMany(() => Course, (course) => course.instructor)
    coursesCreated: Course[];

    @OneToMany(() => CourseEnrollment, (enrollment) => enrollment.student)
    enrollments: CourseEnrollment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}