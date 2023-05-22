import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  //Atributo de la clase para guardar el logger
  private readonly logger = new Logger('ProductService')

  //Constructor de la clase para inyectar el repositorio de la entidad Product
  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,//Se usa para inyectar el repositorio de la entidad Product
  ) {}
  
  //Métodos de la clase
  async create(createProductDto: CreateProductDto) {
    
    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product) //Se usa para guardar el producto en la base de datos

      return product

    } catch (error) {
      this.handleDbException(error)
    }
      
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDbException(error: any){ //Se crea un método privado para manejar los errores de la base de datos y no tener que duplicar el código en cada método
    
      if (error.code === '23505') //Se usa para validar si el error es de tipo duplicado
        throw new BadRequestException(error.detail)//Se usa para arrojar un error de tipo BadRequestException con el detalle del error
      
        this.logger.error(error)//Se usa para guardar el error en el log

      throw new InternalServerErrorException('Error al crear el producto')
  }
}
