import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SubscriptionPlan } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
    @ApiProperty({
        enum: SubscriptionPlan,
        example: Object.values(SubscriptionPlan)[0],
        description: 'Plan de suscripción elegido',
    })
    @IsEnum(SubscriptionPlan)
    plan: SubscriptionPlan;
}