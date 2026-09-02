import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionPlan, SubscriptionStatus } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

const PLAN_PRICES: Record<SubscriptionPlan, number> = {
  [SubscriptionPlan.FREE]: 0,
  [SubscriptionPlan.PREMIUM]: 9.99,
};

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) { }

  async subscribe(userId: string, dto: CreateSubscriptionDto): Promise<Subscription> {
    const existingActive = await this.subscriptionsRepository.findOne({
      where: { user: { id: userId }, status: SubscriptionStatus.ACTIVE },
    });
    if (existingActive) {
      throw new ConflictException('Ya tenés una suscripción activa');
    }

    // --- Simulación de pago: acá iría la llamada real a Stripe/Mercado Pago ---
    const paymentSucceeded = true; // siempre "aprueba", es una simulación
    if (!paymentSucceeded) {
      throw new ConflictException('El pago fue rechazado');
    }
    // ---------------------------------------------------------------------

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 mes de vigencia

    const subscription = this.subscriptionsRepository.create({
      user: { id: userId },
      plan: dto.plan,
      status: SubscriptionStatus.ACTIVE,
      startDate,
      endDate,
      lastPaymentAmount: PLAN_PRICES[dto.plan],
    });

    return this.subscriptionsRepository.save(subscription);
  }

  findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      relations: { user: true },
    });
  }

  async findMine(userId: string): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!subscription) throw new NotFoundException(`Suscripción ${id} no encontrada`);
    return subscription;
  }

  async cancel(id: string, userId: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!subscription) throw new NotFoundException(`Suscripción ${id} no encontrada`);
    if (subscription.user.id !== userId) {
      throw new ConflictException('No podés cancelar la suscripción de otro usuario');
    }

    subscription.status = SubscriptionStatus.CANCELLED;
    return this.subscriptionsRepository.save(subscription);
  }
}