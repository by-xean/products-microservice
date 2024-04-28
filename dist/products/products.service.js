"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ProductsService = ProductsService_1 = class ProductsService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    onModuleInit() {
        this.$connect();
        this.logger.log('Connected to the database');
    }
    create(createProductDto) {
        return this.product.create({
            data: createProductDto
        });
    }
    async findAll({ page, limit }) {
        const total = await this.product.count({ where: { available: true } });
        const products = await this.product.findMany({
            where: { available: true },
            skip: (page - 1) * limit,
            take: limit
        });
        const meta = {
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
        return { meta, products };
    }
    async findOne(id) {
        const product = await this.product.findUnique({
            where: { id, available: true }
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with id: ${id} not found`);
        return product;
    }
    async update(id, updateProductDto) {
        const { id: __, ...data } = updateProductDto;
        await this.findOne(id);
        return this.product.update({
            where: { id },
            data
        });
    }
    async softRemove(id) {
        await this.findOne(id);
        return this.product.update({
            where: { id },
            data: { available: false }
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map