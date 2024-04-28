import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"
import { CreateProductDto, UpdateProductDto } from "@/products/dto"
import { PaginationDto } from "@/common/dto"

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(ProductsService.name)

  onModuleInit() {
    this.$connect()
    this.logger.log('Connected to the database')
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    })
  }

  async findAll({ page, limit }: PaginationDto) {

    const total = await this.product.count({ where: { available: true }})

    const products = await this.product.findMany({
      where: { available: true },
      skip: (page - 1) * limit,
      take: limit
    })

    const meta = {
      total,
      page,
      lastPage: Math.ceil(total / limit)
    }

    return { meta, products }
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    })

    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto

    await this.findOne(id)

    return this.product.update({
      where: { id },
      data
    })
  }

  async softRemove(id: number) {
    await this.findOne(id)

    return this.product.update({
      where: { id },
      data: { available: false }
    })
  }
}
