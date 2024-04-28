import { Controller, Body, Param, Query, ParseIntPipe } from "@nestjs/common";
import { ProductsService } from '@/products/products.service'
import { CreateProductDto } from '@/products/dto/create-product.dto'
import { UpdateProductDto } from '@/products/dto/update-product.dto'
import { PaginationDto } from "@/common/dto"
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @MessagePattern({ cmd: 'find_all_products' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto)
  }

  @MessagePattern({ cmd: 'find_one_product_by_id' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  @MessagePattern({ cmd: 'update_one_product_by_id' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto)
  }

  @MessagePattern({ cmd: 'delete_one_product_by_id' })
  softRemove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.softRemove(id)
  }
}
