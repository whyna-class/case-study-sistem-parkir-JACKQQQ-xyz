import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';


@Controller('parkir')
export class ParkirController {
  constructor(private readonly parkirService: ParkirService) { }


  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createDto: CreateParkirDto) {
    return this.parkirService.create(createDto);
  }


  @Get()
  findAll() {
    return this.parkirService.findAll();
  }


  @Get('total')
  getTotalPendapatan() {
    return this.parkirService.getTotalPendapatan();
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.remove(id);
  }


  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateParkirDto) {
    return this.parkirService.updateDurasi(id, dto);
  }
}