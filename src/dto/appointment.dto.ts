import { ApiProperty } from "@nestjs/swagger";

export class AppointmentDto {
    @ApiProperty({ description: 'código de la persona' })
  personId: number;

  @ApiProperty({ description: 'fecha de cita' })
  scheduled_date: string;

  @ApiProperty({ description: 'costo de la cita' })
  total_amount: number;

  @ApiProperty({ description: 'comentarios' })
  comment: string;
};
