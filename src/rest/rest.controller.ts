import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateRestDto } from './dto/create-rest.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { RestService } from './rest.service';

@Controller('rest')
export class RestController {
  constructor(private readonly restService: RestService) {}

  @ApiOperation({ summary: 'hello', description: 'world' })
  @Post()
  create(@Body() createRestDto: CreateRestDto) {
    return this.restService.create(createRestDto);
  }

  @Get()
  findAll() {
    return this.restService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestDto: UpdateRestDto) {
    return this.restService.update(+id, updateRestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restService.remove(+id);
  }
}
