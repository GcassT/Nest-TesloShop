import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,   
    })
    title: string;

    @Column('float', {
        default: 0,
    })
    price: number;

    @Column('text', {
        nullable: true,
    })
    description: string;

    @Column('text', {
        unique: true,
    })
    slug: string;

    @Column('int', {
        default: 0,
    })
    stock: number;

    @Column('text', {
        array: true,
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text',{
        array: true,
        default: [],
    })
    tags: string[];

    //Images
    @OneToMany( //Un producto puede tener muchas imágenes (OneToMany)
        () => ProductImage,
        productImage => productImage.product,
        {cascade: true}//Si se elimina un producto, se eliminan todas sus imágenes
    )
    images?: ProductImage;

    @BeforeInsert()
    checkSlugInsert() { //Este método se ejecuta antes de insertar un producto en la base de datos
        if (!this.slug) {
            this.slug = this.title;
        }
            this.slug = this.slug
            .toLowerCase().
            replaceAll(' ', '-').
            replaceAll("'", '')
        }
    
    @BeforeUpdate()
    checkSlugUpdate() { //Este método se ejecuta antes de actualizar un producto en la base de datos
            this.slug = this.slug
            .toLowerCase().
            replaceAll(' ', '-').
            replaceAll("'", '')
    }




    }


