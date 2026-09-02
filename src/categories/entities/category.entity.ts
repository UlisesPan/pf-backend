import { IsString, IsOptional, IsUrl, MaxLength, MinLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría (debe ser único)',
        example: 'Tecnología',
        minLength: 2,
        maxLength: 50,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiPropertyOptional({
        description: 'Descripción de la categoría (opcional)',
        example: 'Cursos relacionados con tecnología e innovación',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen de la categoría (opcional)',
        example: 'https://ejemplo.com/imagenes/tecnologia.jpg',
        format: 'url',
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'Color representativo de la categoría (formato hexadecimal)',
        example: '#3498db',
        pattern: '^#[0-9a-fA-F]{6}$',
    })
    @IsOptional()
    @IsString()
    @Matches(/^#[0-9a-fA-F]{6}$/, {
        message: 'El color debe estar en formato hexadecimal (ej: #3498db)'
    })
    color?: string;

    @ApiPropertyOptional({
        description: 'Icono de la categoría (clase de FontAwesome o similar)',
        example: 'fas fa-laptop-code',
    })
    @IsOptional()
    @IsString()
    icon?: string;
}