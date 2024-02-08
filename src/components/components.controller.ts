import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { Prisma } from '@prisma/client';
// import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

// This skips throttle control for all the controller
// @SkipThrottle()
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}
  private readonly logger = new CustomLoggerService(ComponentsController.name)

  @Post()
  create(@Body() createComponentDto: Prisma.ComponentCreateInput) {
    return this.componentsService.create(createComponentDto);
  }
  
  // This allows throttle control over this action
  // @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('active') active?: boolean) {
    this.logger.log(`Request for ALL Components\t${ip}`, ComponentsController.name)
    return this.componentsService.findAll(active);
  }

  // This overrrides the short global object but only for this action
  // @Throttle({ short: { ttl: 1000, limit: 1 }})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentDto: Prisma.ComponentUpdateInput) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
