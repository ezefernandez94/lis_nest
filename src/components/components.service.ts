import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ComponentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createComponentDto: Prisma.ComponentCreateInput) {
    return this.databaseService.component.create({
      data: createComponentDto
    })
  }

  async findAll(active?: boolean) {
    if (active) return this.databaseService.component.findMany({
      where: {
        active,
      }
    })

    return this.databaseService.component.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.component.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateComponentDto: Prisma.ComponentUpdateInput) {
    return this.databaseService.component.update({
      where: {
        id,
      },
      data: updateComponentDto,
    })
  }

  async remove(id: number) {
    return this.databaseService.component.delete({
      where: {
        id,
      }
    })
  }
}
