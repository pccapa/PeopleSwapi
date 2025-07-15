import { ApiProperty } from "@nestjs/swagger";

export class PersonDto {
  @ApiProperty({ description: 'código de la persona' })
  personId?: number;

  @ApiProperty({ description: 'nombre de la persona' })
  name: string;

  @ApiProperty({ description: 'color de cabello' })
  hair_color: string;

  @ApiProperty({ description: 'color de piel' })
  skin_color: string;

  @ApiProperty({ description: 'color de ojo' })
  eye_color: string;

  @ApiProperty({ description: 'cumpleaños' })
  birth_year: string;

  @ApiProperty({ description: 'género' })
  gender: string;

  @ApiProperty({ description: 'mundo' })
  homeworld: string;

  @ApiProperty({ description: 'personaje favorito' })
  fan_image_url?:string
};
