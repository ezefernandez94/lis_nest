import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SuppliersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSupplierDto: Prisma.SupplierCreateInput) {
    return this.databaseService.supplier.create({
      data: createSupplierDto
    })
  }

  findAll(active?: boolean) {
    if (active) return this.databaseService.supplier.findMany({
      where: {
        active,
      }
    })

    return this.databaseService.supplier.findMany()
  }

  findOne(id: number) {
    return this.databaseService.supplier.findUnique({
      where: {
        id,
      }
    })
  }

  update(id: number, updateSupplierDto: Prisma.SupplierUpdateInput) {
    return this.databaseService.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    })
  }

  remove(id: number) {
    return this.databaseService.supplier.delete({
      where: {
        id,
      }
    })
  }
}
