import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true }) //Se usa para validar que cada elemento del arreglo sea un string
    @IsArray()
    sizes: string[];

    @IsIn(['men', 'women', 'unisex']) //Se usa para validar que el valor del campo sea uno de los valores definidos en el arreglo
    gender: string;

}
