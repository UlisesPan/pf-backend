import { IsString, IsOptional, IsUrl, MaxLength, MinLength, IsBoolean, IsPositive, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Tecnología',
        minLength: 3,
        maxLength: 50,
        required: true,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada de la categoría',
        example: 'Productos y servicios relacionados con tecnología e innovación',
        maxLength: 500,
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen o ícono de la categoría',
        example: 'https://ejemplo.com/imagenes/tecnologia.png',
        format: 'url',
        required: false,
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'Estado de la categoría (activa/inactiva)',
        example: true,
        default: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'Orden de visualización (menor número = mayor prioridad)',
        example: 1,
        minimum: 0,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({
        description: 'ID de la categoría padre (para categorías jerárquicas)',
        example: 5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    parentCategoryId?: number;
}