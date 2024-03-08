import { Body, Controller, Post } from '@nestjs/common';
import { RoutesDto } from './dto/routes.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  calculateRoutes(@Body() routesDto: RoutesDto) {
    return this.routesService.calculateRoutes(routesDto);
  }
}
