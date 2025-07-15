import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonDto } from './dto/person.dto';
import { AppointmentDto } from './dto/appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('people')
@ApiTags('Personas')
export class AppController {
  constructor(private readonly adviceService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener las personas' })
  @ApiResponse({
    status: 200,
    description: 'Los resultados son correctos',
    type: PersonDto,
  })
  @ApiResponse({ status: 500, description: 'Ocurrió un error interno' })
  async getAdvices(): Promise<PersonDto[]> {
    return await this.adviceService.getPeople();
  }

  @Get('history')
  @ApiOperation({ summary: 'Obtener el historial de las personas' })
  @ApiResponse({
    status: 200,
    description: 'Los resultados son correctos',
    type: [PersonDto],
  })
  @ApiResponse({ status: 500, description: 'Ocurrió un error interno' })
  async getAdviceHistory(
    @Query('page') page: number,
    @Query('items_per_page') items_per_page: number,
  ): Promise<PersonDto[]> {
    return await this.adviceService.getHistory(page, items_per_page);
  }

  @Post('appointment')
  @ApiOperation({ summary: 'Realizar una cita con la persona' })
  @ApiResponse({ status: 204, description: 'Sin resultado' })
  @ApiResponse({ status: 500, description: 'Ocurrió un error interno' })
  async setAppointment(@Body() appointment: AppointmentDto) {
    return this.adviceService.setAppointment(appointment);
  }
}

