import { ProductsService } from '@/products/products.service';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { PaginationDto } from "@/common/dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(paginationDto: PaginationDto): Promise<{
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
        products: {
            id: number;
            name: string;
            price: number;
            available: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        price: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    softRemove(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
