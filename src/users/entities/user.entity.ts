import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CourseEnrollment } from '../../course-enrollments/entities/course-enrollment.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Course } from '../../courses/entities/course.entity';

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude() // evita que el password se serialice en las respuestas
    passwordHash: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
    role: UserRole;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Column({ type: 'date', nullable: true })
    birthDate: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, length: 200 })
    address: string;

    @Column({ nullable: true, length: 100 })
    city: string;

    @Column({ nullable: true, length: 100 })
    country: string;

    @OneToMany(() => CourseEnrollment, (enrollment) => enrollment.student)
    enrollments: CourseEnrollment[];

    @OneToMany(() => Course, (course) => course.instructor)
    coursesCreated: Course[];

    @OneToMany(() => Subscription, (subscription) => subscription.user)
    subscriptions: Subscription[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}