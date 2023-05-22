import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import {validate as IsUUID} from 'uuid'

@Injectable()
export class ProductsService {
  //Atributo de la clase para guardar el logger
  private readonly logger = new Logger('ProductService')

  //Constructor de la clase para inyectar el repositorio de la entidad Product
  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,// inyectar el repositorio de la entidad Product
  ) {}
  
  //Métodos de la clase
  async create(createProductDto: CreateProductDto) {
    
    try {

      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product) //guardar el producto en la base de datos

      return product

    } catch (error) {
      this.handleDbException(error)
    }
      
  }

  
  findAll(PaginationDto: PaginationDto) {

    const {limit = 10, offset = 0} = PaginationDto

    return this.productRepository.find({
      take: limit,//obtener los primeros 10 productos
      skip: offset//saltar los primeros 10 productos
      //TODO: Relaciones

    }) //obtener todos los productos de la base de datos
  }

  async findOne(id: string) {
    
    let product: Product;
    
    if ( IsUUID(id) ) {// validar si el id es de tipo UUID
      product = await this.productRepository.findOneBy({id: id}) //obtener el producto por id
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();//Se crea un query builder para crear una consulta personalizada a la base de datos
      product = await queryBuilder
      .where('UPPER(Product.title) = UPPER(:title) OR Product.slug = LOWER(:slug)', {// title o slug son los campos de la tabla, se usa el operador OR para validar si el id es de tipo UUID o de tipo string
        title: id.toUpperCase(),
        slug: id.toLowerCase(),
      }).getOne();// Para obtener un solo producto
    }

   
    
    if (!product)
      throw new NotFoundException(`El producto con id ${id} no existe`)

    return product

  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
  }

  private handleDbException(error: any){ //Se crea un método privado para manejar los errores de la base de datos y no tener que duplicar el código en cada método
    
      if (error.code === '23505') //Se usa para validar si el error es de tipo duplicado
        throw new BadRequestException(error.detail)//Se usa para arrojar un error de tipo BadRequestException con el detalle del error
      
        this.logger.error(error)//Se usa para guardar el error en el log

      throw new InternalServerErrorException('Error al crear el producto')
  }
}
