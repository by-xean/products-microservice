import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateProductDto, UpdateProductDto } from "@/products/dto";
import { PaginationDto } from "@/common/dto";
export declare class ProductsService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    create(createProductDto: CreateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        price: number;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll({ page, limit }: PaginationDto): Promise<{
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
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
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
