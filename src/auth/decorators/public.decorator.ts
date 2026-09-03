import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Uso: @Public()
 * Marca una ruta (o controller entero) como accesible sin JWT.
 * Requiere que JwtAuthGuard esté aplicado globalmente.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);